---
title: "Designing Idempotent APIs: The Retry Button Should Never Scare You"
description: "Why idempotency is the most underrated property in API design, and the practical patterns — idempotency keys, natural keys, and state machines — that make retries safe."
date: "2026-05-14"
tags: ["api-design", "distributed-systems", "backend"]
---

Every distributed system has one guaranteed feature: **failure**. Networks flake, pods restart, clients time out and retry. The question is never _whether_ a request will be retried — it's whether your system survives it gracefully.

## What idempotency actually means

An operation is idempotent when performing it multiple times produces the same result as performing it once. `GET` is idempotent for free. `DELETE` usually is. The dangerous ones are `POST` operations with side effects — _charge this card_, _create this order_, _send this email_.

The naive mental model is "the client shouldn't retry." That model is wrong, because the client **cannot know** whether a timed-out request succeeded. There are only two honest options: retry safely, or lose data.

## Pattern 1: Idempotency keys

The industry-standard approach, popularized by Stripe:

```http
POST /v1/payments
Idempotency-Key: 8e03978e-40d5-43e8-bc93-6894a57f9324
Content-Type: application/json

{ "amount": 4999, "currency": "inr" }
```

The server stores the key with the response it produced. A retry with the same key returns the **stored response** instead of re-executing the operation.

```java
public PaymentResult process(String idempotencyKey, PaymentRequest request) {
  var existing = idempotencyStore.find(idempotencyKey);
  if (existing.isPresent()) {
    return existing.get().response(); // replay, don't re-execute
  }
  var result = executePayment(request);
  idempotencyStore.save(idempotencyKey, result);
  return result;
}
```

Two details people miss:

1. **The check and the save must be atomic.** Two concurrent retries with the same key must not both pass the `find`. Use a unique constraint and treat the violation as "someone else won."
2. **Store the response, not just the key.** Returning `409 Conflict` on a retry defeats the purpose — the client still doesn't know what happened.

## Pattern 2: Natural idempotency via state machines

Not every operation needs a key. Model the resource as a state machine and make transitions idempotent by definition:

```sql
UPDATE orders
SET status = 'SHIPPED', shipped_at = now()
WHERE id = $1 AND status = 'PACKED';
```

If the row was already shipped, the `WHERE` clause matches nothing, and the operation is a harmless no-op. The affected-rows count tells you which world you're in.

## Pattern 3: The transactional outbox

When "do the thing" also means "publish the event," you have a two-writes problem. Writing to the database and publishing to Kafka are separate operations — one can fail. The outbox pattern collapses them into a single transaction:

- Write the business row **and** an `outbox` row in one transaction
- A relay process (or CDC like Debezium) publishes outbox rows to the broker
- Consumers deduplicate using the event ID

Exactly-once _processing_ is achievable even though exactly-once _delivery_ is not. Deduplication is idempotency wearing a different hat.

## The takeaway

Design every mutating endpoint by asking: _what happens if this arrives twice?_ If the answer involves the word "hopefully," you have a bug that hasn't happened yet.

Idempotency isn't extra credit. It's the difference between a system that degrades gracefully and one that double-charges customers during an incident — which is exactly when retries spike.
