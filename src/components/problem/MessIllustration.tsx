"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { chips } from "@/content/problem";
import { cx } from "@/lib/cx";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./MessIllustration.module.css";

/** Scattered business files and messages that straighten into one ordered list when scrolled into view. */
export function MessIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.5);
  const reduce = useReducedMotion();
  const [lined, setLined] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setLined(true), 300);
    return () => clearTimeout(id);
  }, [inView]);

  const ordered = reduce || lined;

  return (
    <div
      ref={ref}
      className={cx(styles.mess, ordered && styles.ordered)}
      role="img"
      aria-label="Scattered business files and messages that line up into an ordered, connected list"
    >
      {chips.map((c) => (
        <span
          key={c.label}
          className={styles.chip}
          style={
            {
              "--x": `${c.x}px`,
              "--y": `${c.y}px`,
              "--r": `${c.r}deg`,
              "--oy": `${c.oy}px`,
              "--d": `${c.delay}s`,
            } as CSSProperties
          }
        >
          <i aria-hidden="true" />
          {c.arabic ? (
            <span className="ar" lang="ar" dir="rtl">
              {c.label}
            </span>
          ) : (
            c.label
          )}
          {c.tag && <span className={styles.tag}>{c.tag}</span>}
        </span>
      ))}
      <span className={styles.label}>{ordered ? "7 sources, 1 picture" : "7 sources, 0 connections"}</span>
    </div>
  );
}
