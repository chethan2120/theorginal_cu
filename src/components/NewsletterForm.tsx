import { useState, type FormEvent } from "react";
import { readJson, writeJson } from "../lib/storage.ts";
import { fieldClass } from "./ui.tsx";

const KEY = "the-original-newsletter";

export function NewsletterForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address.");
      setDone(false);
      return;
    }
    const existing = readJson<string[]>(KEY, []);
    if (!existing.includes(value)) writeJson(KEY, [...existing, value]);
    setError("");
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "" : "max-w-xl"} noValidate>
      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "flex flex-col gap-3 sm:flex-row"}>
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className={`${fieldClass} ${compact ? "border-white/20 bg-transparent text-paper placeholder:text-paper/50" : ""}`}
        />
        <button
          type="submit"
          className={
            compact
              ? "border border-gold-line px-5 py-3 text-[12px] tracking-[0.16em] uppercase text-paper hover:bg-paper hover:text-navy"
              : "bg-navy px-5 py-3 text-[12px] tracking-[0.16em] uppercase text-paper hover:bg-navy-soft"
          }
        >
          Subscribe
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {done ? (
        <p className={`mt-2 text-sm ${compact ? "text-gold-line" : "text-navy"}`} role="status">
          Saved on this device. A mailing service is not connected, so this address has not been sent anywhere.
        </p>
      ) : null}
    </form>
  );
}
