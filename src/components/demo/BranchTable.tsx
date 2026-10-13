import { branchTable, type Lang } from "@/content/demo";
import { cx } from "@/lib/cx";
import styles from "./Demo.module.css";

export function BranchTable({ lang }: { lang: Lang }) {
  const h = branchTable.headers;
  return (
    <div className={styles.tableBox}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{h.branch[lang]}</th>
            <th>{h.before[lang]}</th>
            <th>{h.after[lang]}</th>
            <th>{h.shelf[lang]}</th>
          </tr>
        </thead>
        <tbody>
          {branchTable.rows.map((r) => (
            <tr key={r.branch.en}>
              <td>{r.branch[lang]}</td>
              <td className={styles.num}>{r.before}</td>
              <td className={styles.num}>{r.after}</td>
              <td>
                <span className={cx("pill", r.out && "out")}>
                  {(r.out ? branchTable.status.out : branchTable.status.stocked)[lang]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
