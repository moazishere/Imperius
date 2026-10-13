import { Section } from "@/components/ui/Section";
import { faq } from "@/content/faq";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <Section id="faq" tint innerClassName={styles.wrap}>
      <div>
        <p className="eyebrow">Questions</p>
        <h2>Before you ask.</h2>
      </div>
      <div className={styles.faq}>
        {faq.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
