import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.tsx";
import { PageWidth, btnPrimary, fieldClass, labelClass } from "../components/ui.tsx";
import { readJson, writeJson } from "../lib/storage.ts";

type Message = {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const KEY = "the-original-messages";

const asks = [
  { title: "A weight or a price", text: "Ask which size suits a kitchen, or why two packs of the same spice differ." },
  { title: "A photograph", text: "If a picture is a stand-in, say so here. The product page already marks the ones we know about." },
  { title: "An order on this device", text: "Orders live in this browser under Profile. The form cannot look one up on a server." },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (phone.trim() && !/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""))) {
      next.phone = "Enter a 10-digit mobile number, or leave the field empty.";
    }
    if (message.trim().length < 10) next.message = "Write at least a short note.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }
    const entry: Message = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    writeJson(KEY, [entry, ...readJson<Message[]>(KEY, [])]);
    setSent(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return (
    <>
      <Seo
        title="Contact us — THE ORIGINAL"
        description="Send a note to THE ORIGINAL. The form is validated on this device. A studio address has not been supplied yet."
      />
      <section className="relative isolate min-h-[420px] overflow-hidden bg-navy">
        <div className="hero-frame">
          <img
            src="/images/editorial/contact-hero.jpg"
            alt="An envelope, a brass pen, cardamom and cinnamon on dark slate"
            className="hero-breathe"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/45 to-navy/20" />
        <PageWidth className="relative flex min-h-[420px] items-end py-12">
          <div className="max-w-xl text-paper">
            <p className="text-[12px] tracking-[0.22em] text-gold-line uppercase">Contact us</p>
            <h1 className="mt-3 font-serif text-5xl leading-tight font-medium sm:text-6xl">Write to the house.</h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-paper/85">
              A question about a weight, a photograph, or the sample catalogue. The note stays on this device until an inbox is connected.
            </p>
          </div>
        </PageWidth>
      </section>

      <PageWidth className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <h2 className="font-serif text-4xl text-navy">Send a note</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-mute">
            A phone number, email inbox and street address have not been provided. The form checks what you type and stores the note in this browser. It is not delivered to an inbox.
          </p>
          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
            <div>
              <label htmlFor="contact-name" className={labelClass}>Name</label>
              <input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} autoComplete="name" />
              {errors.name ? <p className="mt-1 text-sm text-danger">{errors.name}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-email" className={labelClass}>Email</label>
                <input id="contact-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} autoComplete="email" />
                {errors.email ? <p className="mt-1 text-sm text-danger">{errors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-phone" className={labelClass}>Mobile, optional</label>
                <input id="contact-phone" value={phone} onChange={(event) => setPhone(event.target.value)} className={fieldClass} autoComplete="tel" />
                {errors.phone ? <p className="mt-1 text-sm text-danger">{errors.phone}</p> : null}
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className={labelClass}>Message</label>
              <textarea id="contact-message" value={message} onChange={(event) => setMessage(event.target.value)} className={`${fieldClass} min-h-36`} />
              {errors.message ? <p className="mt-1 text-sm text-danger">{errors.message}</p> : null}
            </div>
            <button type="submit" className={btnPrimary}>Send note</button>
            {sent ? (
              <p className="text-sm text-navy" role="status">
                The note is saved on this device. It has not been emailed.
              </p>
            ) : null}
          </form>
        </div>
        <aside className="h-fit rounded-[1.4rem] border border-line bg-ivory p-6">
          <h2 className="font-serif text-3xl text-navy">Still to confirm</h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-[12px] tracking-[0.14em] text-mute uppercase">Address</dt>
              <dd className="mt-1">Not supplied.</dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.14em] text-mute uppercase">Phone</dt>
              <dd className="mt-1">Not supplied.</dd>
            </div>
            <div>
              <dt className="text-[12px] tracking-[0.14em] text-mute uppercase">Email</dt>
              <dd className="mt-1">Not supplied.</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-6 text-mute">
            Orders already placed on this browser are under <Link to="/account" className="text-navy underline">Profile</Link>.
          </p>
        </aside>
      </PageWidth>

      <section className="border-t border-line bg-ivory">
        <PageWidth className="grid gap-8 py-14 md:grid-cols-3">
          {asks.map((item) => (
            <article key={item.title}>
              <h2 className="font-serif text-3xl text-navy">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-mute">{item.text}</p>
            </article>
          ))}
        </PageWidth>
      </section>
    </>
  );
}
