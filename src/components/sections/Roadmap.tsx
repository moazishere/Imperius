import { Section, SectionHead } from "@/components/ui/Section";
import { roadmap } from "@/content/roadmap";
import { cx } from "@/lib/cx";
import styles from "./Roadmap.module.css";

export function Roadmap() {
  return (
    <Section id="roadmap" tint>
      <SectionHead
        eyebrow="Roadmap"
        title={
          <>
            Built in stages, <span className="dim">each one proven before the next.</span>
          </>
        }
        lead="Every stage answers a harder question. We ship one, prove it with real customers, then build on it."
      />
      <ol className={styles.roadmap}>
        {roadmap.map((item) => {
          const now = item.status === "In pilot";
          return (
            <li key={item.v} className={cx(now && styles.now)}>
              <span className={styles.v}>{item.v}</span>
              <b>{item.title}</b>
              <span>{item.text}</span>
              <span className={cx(styles.status, "pill", now && "out")}>{item.status}</span>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
