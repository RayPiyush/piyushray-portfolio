---
title: "The Kafka Consumer Lag Playbook"
description: "A field guide to diagnosing and fixing consumer lag — from partition math and poll-loop tuning to the rebalancing traps that silently halve your throughput."
date: "2026-02-20"
tags: ["kafka", "performance", "distributed-systems"]
---

Consumer lag is Kafka's check-engine light. It tells you _something_ is wrong, but not what. After debugging lag across a few production systems, the causes almost always fall into four buckets.

## Bucket 1: You simply don't have enough parallelism

Kafka's unit of consumer parallelism is the **partition**. Twelve partitions means at most twelve consumers doing useful work — the thirteenth sits idle.

The check takes one command:

```bash
kafka-consumer-groups --bootstrap-server localhost:9092 \
  --describe --group payment-processors
```

If every partition shows steady lag growth and your consumers are CPU-bound, add partitions _and_ consumers. If only some partitions lag, you have a **hot key** problem instead — one account, tenant, or device is receiving a disproportionate share of traffic, and no amount of scaling fixes a skewed partition key.

## Bucket 2: Slow processing disguised as lag

The consumer isn't slow; the code it calls is. A 50ms database call inside the poll loop caps a single consumer at ~20 messages/second. The classic fix hierarchy, cheapest first:

1. **Batch the side effects.** Collect a poll's worth of records, do one bulk insert.
2. **Pipeline with local queues.** Poll thread hands records to a worker pool; commit only what's completed. (Mind ordering per partition.)
3. **Cache the lookups.** Most per-message DB reads are reading the same rows.

```java
// Instead of one write per record:
List<LedgerEntry> batch = records.stream()
    .map(this::toEntry)
    .toList();
ledgerRepository.saveAll(batch);   // one round trip
consumer.commitSync();
```

## Bucket 3: Rebalancing storms

Every rebalance pauses the entire group. If your `max.poll.interval.ms` is smaller than your worst-case batch processing time, the broker assumes the consumer died, kicks it, and triggers a rebalance — which slows everyone down, which lengthens processing, which triggers another kick. A death spiral with a very boring root cause.

The tell: lag graphs that look like a sawtooth, plus `Attempt to heartbeat failed` in the logs.

The fix is honest configuration:

- `max.poll.interval.ms` — set above your _real_ worst-case batch time
- `max.poll.records` — lower it so each poll is a smaller promise
- Use **cooperative sticky assignment** so a single joining consumer doesn't stop the world

## Bucket 4: The lag is fine, your alert is wrong

Absolute lag numbers are meaningless without rate context. Ten thousand messages of lag on a topic doing 50K/sec clears in 200ms. The same lag on a 10/sec topic is 16 minutes of delay.

Alert on **time-lag** (how old is the oldest unprocessed message) or **lag trend** (is it growing across N evaluation windows), never on a raw count.

## The 10-minute triage

When lag pages you at 3am, in order:

1. `--describe` the group — is lag uniform or concentrated in a few partitions?
2. Check consumer logs for rebalance chatter.
3. Compare processing rate vs. produce rate — arithmetic beats intuition.
4. Look at what the handler _calls_ — the bottleneck is usually downstream.

Lag is never the disease. It's the fever. Find the infection.
