"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/Links";

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a free Formspree / Web3Forms URL) to connect the form.
// Until then the form validates but clearly states that nothing is sent.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

function validate(v) {
  const e = {};
  if (!v.name.trim() || v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address, e.g. name@company.com.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number, or leave this empty.";
  if (!v.message.trim() || v.message.trim().length < 10) e.message = "Please tell us a little about your project (at least 10 characters).";
  if (!v.consent) e.consent = "Please confirm you have read the privacy notice.";
  return e;
}

const EMPTY = { name: "", email: "", phone: "", company: "", capability: "", message: "", consent: false, website: "" };

export default function ContactForm({ capabilities, fallbackEmail }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | not-connected
  const formRef = useRef(null);

  const set = (k) => (ev) => {
    const val = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    setTouched({ name: true, email: true, phone: true, message: true, consent: true });
    if (Object.keys(e).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    if (values.website) return; // honeypot: silently ignore bots

    if (!ENDPOINT) {
      setStatus("not-connected");
      return;
    }
    setStatus("sending");
    try {
      const { website, ...payload } = values;
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const field = "mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-[17px] outline-none transition-colors placeholder:text-muted/70 focus:border-teal focus-visible:outline-none";
  const err = (k) => touched[k] && errors[k];
  const describedBy = (k) => (err(k) ? `${k}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={ENDPOINT ? undefined : "form-status-note"} className="space-y-8">
      {!ENDPOINT && (
        <p id="form-status-note" className="flex items-start gap-3 border border-teal/30 bg-mist px-4 py-3 text-sm text-ink/80">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
          <span>
            <strong className="font-medium">Form not connected yet.</strong> This form checks your details but does not send them until a recipient and form service are set up. Please email{" "}
            <span className="whitespace-nowrap">{fallbackEmail}</span> for now.
          </span>
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow text-muted">
            Name <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required value={values.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!err("name")} aria-describedby={describedBy("name")} className={`${field} ${err("name") ? "border-red-700" : "border-ink/25"}`} />
          {err("name") && <p id="name-error" className="mt-2 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow text-muted">
            Email <span aria-hidden="true" className="text-teal">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={!!err("email")} aria-describedby={describedBy("email")} className={`${field} ${err("email") ? "border-red-700" : "border-ink/25"}`} />
          {err("email") && <p id="email-error" className="mt-2 text-sm text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow text-muted">
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set("phone")} onBlur={blur("phone")} aria-invalid={!!err("phone")} aria-describedby={describedBy("phone")} className={`${field} ${err("phone") ? "border-red-700" : "border-ink/25"}`} />
          {err("phone") && <p id="phone-error" className="mt-2 text-sm text-red-700">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="company" className="eyebrow text-muted">
            Company / brand <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input id="company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={`${field} border-ink/25`} />
        </div>
      </div>

      <div>
        <label htmlFor="capability" className="eyebrow text-muted">
          What are you interested in? <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <select id="capability" name="capability" value={values.capability} onChange={set("capability")} className={`${field} cursor-pointer border-ink/25`}>
          <option value="">Choose a capability</option>
          {capabilities.map((c) => (
            <option key={c.slug} value={c.title}>
              {c.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow text-muted">
          Your project <span aria-hidden="true" className="text-teal">*</span>
        </label>
        <textarea id="message" name="message" rows={5} required value={values.message} onChange={set("message")} onBlur={blur("message")} aria-invalid={!!err("message")} aria-describedby={describedBy("message")} className={`${field} resize-y ${err("message") ? "border-red-700" : "border-ink/25"}`} />
        {err("message") && <p id="message-error" className="mt-2 text-sm text-red-700">{errors.message}</p>}
      </div>

      {/* honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[15px]">
          <input type="checkbox" name="consent" checked={values.consent} onChange={set("consent")} onBlur={blur("consent")} aria-invalid={!!err("consent")} aria-describedby={describedBy("consent")} className="mt-1 h-4 w-4 shrink-0 accent-teal" />
          <span>
            I agree that MONARA Productions may use these details to reply to my enquiry. See the{" "}
            <Link href="/privacy-policy" className="text-teal underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {err("consent") && <p id="consent-error" className="mt-2 text-sm text-red-700">{errors.consent}</p>}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className="group inline-flex items-center justify-center gap-3 bg-teal px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-teal-deep disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <Arrow className="group-hover:translate-x-1" />
        </button>
        <div role="status" aria-live="polite" className="text-sm">
          {status === "not-connected" && (
            <p className="text-ink">
              <strong className="font-medium">Your details look good, but nothing was sent:</strong> this form is not connected yet. Please email {fallbackEmail}.
            </p>
          )}
          {status === "sent" && <p className="text-teal">Thank you. Your enquiry has been sent.</p>}
          {status === "error" && <p className="text-red-700">Sorry, something went wrong and your enquiry was not sent. Please try again or email {fallbackEmail}.</p>}
        </div>
      </div>
    </form>
  );
}
