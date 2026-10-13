import { useRef, type KeyboardEvent } from "react";
import { demoQuestions, type Lang, type QuestionKey } from "@/content/demo";
import styles from "./Demo.module.css";

export function QuestionTabs({
  active,
  lang,
  onSelect,
}: {
  active: QuestionKey;
  lang: Lang;
  onSelect: (key: QuestionKey) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent, idx: number) {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (idx + dir + demoQuestions.length) % demoQuestions.length;
    refs.current[next]?.focus();
    onSelect(demoQuestions[next].key);
  }

  return (
    <div className={styles.tabs} role="tablist" aria-label="Example questions">
      {demoQuestions.map((q, idx) => {
        const on = q.key === active;
        return (
          <button
            key={q.key}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            className={styles.qBtn}
            role="tab"
            id={`tab-${q.key}`}
            aria-controls="demo-panel"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            type="button"
            onClick={() => onSelect(q.key)}
            onKeyDown={(e) => onKeyDown(e, idx)}
          >
            <small lang={lang}>{q.label[lang]}</small>
            <span lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "ar" : undefined}>
              {q.q[lang]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
