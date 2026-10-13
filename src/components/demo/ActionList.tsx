import { buttonClass } from "@/components/ui/Button";
import { nextActions, type Lang } from "@/content/demo";
import { cx } from "@/lib/cx";
import styles from "./Demo.module.css";

export function ActionList({
  lang,
  approved,
  onToggle,
}: {
  lang: Lang;
  approved: boolean[];
  onToggle: (index: number) => void;
}) {
  return (
    <div className={styles.actionsList}>
      {nextActions.items.map((item, i) => (
        <div key={item.text.en} className={styles.act}>
          <p>
            <span>{item.text[lang]}</span>
            <span>{item.impact[lang]}</span>
          </p>
          <button
            className={buttonClass({ size: "small" }, cx(approved[i] && styles.done))}
            type="button"
            onClick={() => onToggle(i)}
          >
            {(approved[i] ? nextActions.approved : nextActions.approve)[lang]}
          </button>
        </div>
      ))}
    </div>
  );
}
