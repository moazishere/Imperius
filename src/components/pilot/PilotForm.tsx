"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { requestPilot, type PilotState } from "@/app/actions/pilot";
import { buttonClass } from "@/components/ui/Button";
import { dataSources } from "@/content/pilot";
import styles from "./Pilot.module.css";

const REQUIRED = ["name", "company", "contact"] as const;

export function PilotForm() {
  const [state, action, pending] = useActionState<PilotState, FormData>(requestPilot, { status: "idle" });
  const [missing, setMissing] = useState(false);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const wasSent = useRef(false);

  const sent = state.status === "sent" && state.id !== dismissed;
  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;

  // Move focus to whichever panel just appeared, but only when it actually switches
  // (never on first load, or the page would scroll down to the form).
  useEffect(() => {
    if (sent === wasSent.current) return;
    wasSent.current = sent;
    if (sent) sentRef.current?.focus();
    else nameRef.current?.focus();
  }, [sent]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const empty = REQUIRED.map((n) => form.elements.namedItem(n) as HTMLInputElement).find((el) => !el.value.trim());
    setMissing(!!empty);
    if (empty) {
      e.preventDefault();
      empty.focus();
    }
  }

  return (
    <div>
      <form className={styles.form} action={action} onSubmit={onSubmit} noValidate hidden={sent}>
        <div className={styles.row2}>
          <div className={styles.field}>
            <label htmlFor="f-name">Your name</label>
            <input ref={nameRef} id="f-name" name="name" autoComplete="name" required defaultValue={values?.name} />
          </div>
          <div className={styles.field}>
            <label htmlFor="f-company">Company</label>
            <input id="f-company" name="company" autoComplete="organization" required defaultValue={values?.company} />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="f-contact">Email or WhatsApp number</label>
          <input id="f-contact" name="contact" autoComplete="email" required defaultValue={values?.contact} />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-systems">Where does your data live today?</label>
          <select id="f-systems" name="systems" defaultValue={values?.systems}>
            {dataSources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="f-question">
            One question you wish you could answer today <span className={styles.optional}>(optional)</span>
          </label>
          <textarea id="f-question" name="question" defaultValue={values?.question} />
        </div>
        <div className={styles.honeypot} aria-hidden="true">
          <label>
            Website <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {(missing || state.status === "invalid") && (
          <p className={styles.error}>Add your name, company and a way to reach you, then send again.</p>
        )}
        {!missing && state.status === "error" && (
          <p className={styles.error}>We couldn&apos;t send your request just now. Please try again in a moment.</p>
        )}
        <button className={buttonClass()} type="submit" disabled={pending}>
          {pending ? "Sending…" : "Request a pilot"}
        </button>
        <p className={styles.note}>We reply to every request personally.</p>
      </form>

      <div className={styles.sent} ref={sentRef} tabIndex={-1} hidden={!sent}>
        <h3>Request received.</h3>
        <p>
          {state.status === "sent" && state.name
            ? `Thanks, ${state.name}. We'll be in touch to plan a pilot for ${state.company}.`
            : "Thanks. We'll be in touch to plan your pilot."}
        </p>
        <button
          className={`textlink ${styles.again}`}
          type="button"
          onClick={() => setDismissed(state.status === "sent" ? state.id : null)}
        >
          Send another request
        </button>
      </div>
    </div>
  );
}
