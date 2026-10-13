import { Section, SectionHead } from "@/components/ui/Section";
import { useCases } from "@/content/useCases";
import { cx } from "@/lib/cx";
import styles from "./UseCases.module.css";

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead
        eyebrow="Use cases"
        title="Built for businesses that run on stock, branches and orders."
        lead="Starting with companies in Syria, where data is the most scattered and the gains are the largest."
      />
      <div className={styles.cases}>
        {useCases.map((c) => (
          <article key={c.title} className={styles.case}>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <q className={styles.q}>{c.en}</q>
            <q className={cx(styles.q, "ar")} lang="ar" dir="rtl">
              {c.ar}
            </q>
          </article>
        ))}
      </div>
    </Section>
  );
}
