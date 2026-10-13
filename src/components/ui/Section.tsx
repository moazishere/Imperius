import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Section.module.css";

/** Full-width section with vertical padding, optional tinted background, and a centred column inside. */
export function Section({
  id,
  tint,
  innerClassName,
  children,
}: {
  id: string;
  tint?: boolean;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section className={cx("section", tint && "tint")} id={id}>
      <div className={cx("wrap", innerClassName)}>{children}</div>
    </section>
  );
}

/** Eyebrow + heading on the left, lead paragraph on the right, bottom-aligned. */
export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead: ReactNode }) {
  return (
    <div className={styles.head}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p className={cx("lead", styles.lead)}>{lead}</p>
    </div>
  );
}
