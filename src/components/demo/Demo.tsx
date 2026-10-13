"use client";

import { useState } from "react";
import { demoChrome, demoQuestions, nextActions, type Lang, type QuestionKey } from "@/content/demo";
import { cx } from "@/lib/cx";
import { ActionList } from "./ActionList";
import { BranchTable } from "./BranchTable";
import { LangToggle } from "./LangToggle";
import { QuestionTabs } from "./QuestionTabs";
import { SalesChart } from "./SalesChart";
import styles from "./Demo.module.css";

/** Sample Q&A: pick a question, switch the answer language, approve suggested actions. */
export function Demo() {
  const [key, setKey] = useState<QuestionKey>("happened");
  const [lang, setLang] = useState<Lang>("en");
  const [approved, setApproved] = useState<boolean[]>(() => nextActions.items.map(() => false));

  const current = demoQuestions.find((q) => q.key === key)!;
  const ar = lang === "ar";

  return (
    <div className={styles.demo}>
      <div className={styles.side}>
        <p className="eyebrow" lang={lang}>
          {demoChrome.tryQuestion[lang]}
        </p>
        <QuestionTabs active={key} lang={lang} onSelect={setKey} />
      </div>

      <div className={styles.main}>
        <div className={styles.top}>
          <span lang={lang}>{demoChrome.topLabel[lang]}</span>
          <LangToggle lang={lang} onChange={setLang} />
        </div>

        <div
          className={cx(styles.body, ar && "ar")}
          id="demo-panel"
          role="tabpanel"
          aria-labelledby={`tab-${key}`}
          aria-live="polite"
          dir={ar ? "rtl" : "ltr"}
          lang={lang}
        >
          <div className={styles.ask}>{current.q[lang]}</div>
          <div className={styles.answer}>
            <p className={styles.answerText}>{current.a[lang]}</p>
            {key === "happened" && <SalesChart lang={lang} />}
            {key === "why" && <BranchTable lang={lang} />}
            {key === "next" && (
              <ActionList
                lang={lang}
                approved={approved}
                onToggle={(i) => setApproved((a) => a.map((v, j) => (j === i ? !v : v)))}
              />
            )}
          </div>
        </div>
        <div className={styles.foot}>
          <span lang={lang}>{demoChrome.footer[lang]}</span>
        </div>
      </div>
    </div>
  );
}
