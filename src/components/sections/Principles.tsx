import { Section, SectionHead } from "@/components/ui/Section";
import { pipeline } from "@/content/pipeline";
import styles from "./Principles.module.css";

export function Principles() {
  return (
    <Section id="principles" tint>
      <SectionHead
        eyebrow="How we think"
        title={
          <>
            Data first. <span className="dim">AI last.</span>
          </>
        }
        lead="A chatbot guessing from your files isn't enough to run a business on. Imperius builds the numbers first and lets AI explain them."
      />
      <div className={styles.pipeline}>
        {pipeline.map((s) => (
          <div key={s.title} className={styles.stage}>
            <b>{s.title}</b>
            <span>{s.text}</span>
          </div>
        ))}
      </div>
      <div className={styles.truth}>
        <p>The AI explains the results. The ground truth always comes from your data.</p>
        <small>Every answer links back to its source records.</small>
      </div>
    </Section>
  );
}
