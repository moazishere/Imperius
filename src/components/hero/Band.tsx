import { ButtonLink } from "@/components/ui/Button";
import styles from "./Band.module.css";

export function Band() {
  return (
    <section className={styles.band} aria-labelledby="band-title">
      <p className="eyebrow">One question, all your data</p>
      <h2 id="band-title" className={styles.title}>
        <span><b>What</b> happened.</span>
        <span><b>Why</b> it happened.</span>
        <span><b>What</b> to do next.</span>
      </h2>
      <div className={styles.foot}>
        <p>Imperius answers all three from your own records, joined into one picture instead of scattered across systems.</p>
        <ButtonLink variant="line" href="#demo">See it answer</ButtonLink>
      </div>
    </section>
  );
}
