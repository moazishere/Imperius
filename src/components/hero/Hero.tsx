"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { BUST_DOTS } from "@/lib/bustGrid";
import { cx } from "@/lib/cx";
import { BustCanvas } from "./BustCanvas";
import { ChaosWord } from "./ChaosWord";
import styles from "./Hero.module.css";

const DOT_COUNT = BUST_DOTS.length.toLocaleString("en");

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const [replay, setReplay] = useState(0);

  // Let the scattered letters paint once, then settle them so the transition runs.
  useLayoutEffect(() => {
    if (settled) return;
    void heroRef.current?.offsetWidth;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [settled]);

  function scatterAgain() {
    setSettled(false);
    setReplay((n) => n + 1);
  }

  return (
    <section className={styles.hero} id="top" ref={heroRef}>
      <BustCanvas heroRef={heroRef} slotRef={slotRef} replay={replay} className={styles.field} />
      <div className={styles.bust}>
        <div
          className={styles.slot}
          ref={slotRef}
          role="img"
          aria-label="A classical marble bust drawn from thousands of small squares, assembled from scattered points"
        />
        <div className={styles.meta}>
          <span>{DOT_COUNT} data points, in order</span>
          <button className="textlink" type="button" onClick={scatterAgain}>
            Scatter again
          </button>
        </div>
      </div>
      <div className={styles.copy}>
        <h1 className={styles.title}>
          <span className="dim">
            Turning <ChaosWord settled={settled} />
          </span>
          <br />
          into Knowledge.
        </h1>
        <p className={cx("lead", styles.lead)}>
          Your sales, stock and operations sit in ten places and five formats. Imperius connects them into one layer of
          organized knowledge you can ask, trust and act on.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="#pilot">Book a pilot</ButtonLink>
          <span className={styles.note}>
            <i aria-hidden="true" />
            Now onboarding pilot companies in Syria
          </span>
        </div>
      </div>
    </section>
  );
}
