import { salesChart, type Lang } from "@/content/demo";
import { cx } from "@/lib/cx";
import styles from "./Demo.module.css";

export function SalesChart({ lang }: { lang: Lang }) {
  return (
    <div>
      <div className={styles.bars} role="img" aria-label={salesChart.label[lang]}>
        {salesChart.bars.map((b) => (
          <div key={b.day.en} className={cx(styles.bar, b.low && styles.low)}>
            <span style={{ height: `${b.height}%` }} />
          </div>
        ))}
      </div>
      <div className={styles.barLabels} aria-hidden="true">
        {salesChart.bars.map((b) => (
          <span key={b.day.en}>{b.day[lang]}</span>
        ))}
      </div>
      <div className={styles.legend}>
        <span>
          <i style={{ background: "var(--ink)" }} />
          {salesChart.legend.series[lang]}
        </span>
        <span>
          <i style={{ background: "var(--line-strong)" }} />
          {salesChart.legend.low[lang]}
        </span>
      </div>
    </div>
  );
}
