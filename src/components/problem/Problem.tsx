import { Section } from "@/components/ui/Section";
import { painPoints } from "@/content/problem";
import { MessIllustration } from "./MessIllustration";
import styles from "./Problem.module.css";

export function Problem() {
  return (
    <Section id="problem" innerClassName={styles.problem}>
      <MessIllustration />
      <div>
        <p className="eyebrow">The problem</p>
        <h2>
          Your data already knows. <span className="dim">Nobody can ask it.</span>
        </h2>
        <p className="lead">
          Every business runs on numbers it can&apos;t see. The answers exist, but they&apos;re split across files, systems
          and chats that never talk to each other.
        </p>
        <ul className={styles.list}>
          {painPoints.map((p) => (
            <li key={p.title}>
              <b>{p.title}</b>
              {p.text}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
