"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

/**
 * Contact form — currently opens the visitor's mail client with a
 * pre-filled message (zero-backend, works everywhere).
 *
 * To upgrade to a real email integration, POST the fields to a route
 * handler wired to Resend/SendGrid/Formspree inside handleSubmit.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ada@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          placeholder="Tell me about the problem you're solving…"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" variant="accent">
          <Send className="size-4" aria-hidden />
          Send message
        </Button>
        <p className="text-xs text-subtle" role="status" aria-live="polite">
          {status === "sent"
            ? "Your mail client should be open — thanks for reaching out!"
            : "Opens your mail client with the message pre-filled."}
        </p>
      </div>
    </form>
  );
}
