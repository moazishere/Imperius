import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./ChaosWord.module.css";

/** [letter, x offset, y offset, rotation] while scattered. */
const LETTERS: [string, number, number, number][] = [
  ["C", -8, -22, -16],
  ["h", 6, 18, 11],
  ["a", -2, -30, -6],
  ["o", 10, 12, 19],
  ["s", 16, -14, -12],
];

/** "Chaos" with jumbled letters that settle into place. Screen readers get the plain word. */
export function ChaosWord({ settled }: { settled: boolean }) {
  return (
    <>
      <span className={cx(styles.chaos, settled && styles.settled)} aria-hidden="true">
        {LETTERS.map(([ch, tx, ty, r]) => (
          <span key={ch} style={{ "--tx": `${tx}px`, "--ty": `${ty}px`, "--r": `${r}deg` } as CSSProperties}>
            {ch}
          </span>
        ))}
      </span>
      <span className="sr-only">Chaos</span>
    </>
  );
}
