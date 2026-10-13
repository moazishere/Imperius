import { Section, SectionHead } from "@/components/ui/Section";
import { steps } from "@/content/steps";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <Section id="how" tint>
      <SectionHead
        eyebrow="How it works"
        title={
          <>
            From scattered records to clear answers, <span className="dim">in three steps.</span>
          </>
        }
        lead="You keep the systems you already use. Imperius sits on top of them, so nobody on your team has to change how they work."
      />
      <div className={styles.steps}>
        {steps.map((s) => (
          <div key={s.n} className={styles.step}>
            <span className={styles.n}>{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className={styles.detail}>{s.detail}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
