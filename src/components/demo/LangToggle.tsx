import type { Lang } from "@/content/demo";
import styles from "./Demo.module.css";

export function LangToggle({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div className={styles.lang} role="group" aria-label="Answer language">
      <button type="button" aria-pressed={lang === "en"} onClick={() => onChange("en")}>
        EN
      </button>
      <button type="button" aria-pressed={lang === "ar"} onClick={() => onChange("ar")} className="ar" lang="ar">
        عربي
      </button>
    </div>
  );
}
