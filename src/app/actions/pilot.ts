"use server";

export type PilotValues = { name: string; company: string; contact: string; systems: string; question: string };

export type PilotState =
  | { status: "idle" }
  | { status: "invalid" | "error"; values: PilotValues }
  | { status: "sent"; id: string; name: string; company: string };

function field(fd: FormData, key: string, max = 200) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Emails the request through Resend. Without credentials it logs in development and fails in production. */
async function deliver(v: PilotValues) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.PILOT_EMAIL_TO;
  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[pilot] RESEND_API_KEY / PILOT_EMAIL_TO not set; request not emailed:", v);
      return true;
    }
    console.error("[pilot] RESEND_API_KEY / PILOT_EMAIL_TO not set; request was not delivered");
    return false;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.PILOT_EMAIL_FROM || "Imperius <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: v.contact.includes("@") ? v.contact : undefined,
      subject: `Pilot request: ${v.company}`,
      text: [
        `Name: ${v.name}`,
        `Company: ${v.company}`,
        `Contact: ${v.contact}`,
        `Data lives in: ${v.systems}`,
        `Question: ${v.question || "(none)"}`,
      ].join("\n"),
    }),
  });
  if (!res.ok) {
    console.error("[pilot] Resend responded", res.status, await res.text());
    return false;
  }
  return true;
}

export async function requestPilot(_prev: PilotState, fd: FormData): Promise<PilotState> {
  const values: PilotValues = {
    name: field(fd, "name"),
    company: field(fd, "company"),
    contact: field(fd, "contact"),
    systems: field(fd, "systems"),
    question: field(fd, "question", 2000),
  };

  // Honeypot: hidden from people, so anything here came from a bot. Pretend it worked.
  if (field(fd, "website")) return { status: "sent", id: crypto.randomUUID(), name: values.name, company: values.company };

  if (!values.name || !values.company || !values.contact) return { status: "invalid", values };

  try {
    if (!(await deliver(values))) return { status: "error", values };
  } catch (err) {
    console.error("[pilot] delivery failed", err);
    return { status: "error", values };
  }
  return { status: "sent", id: crypto.randomUUID(), name: values.name, company: values.company };
}
