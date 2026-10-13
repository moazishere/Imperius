import styles from "./Logo.module.css";

/** 3×3 grid of squares; the top-left ones are faded and tilted, settling into order. */
export function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="currentColor">
      <rect x="1" y="0.5" width="4" height="4" opacity=".3" transform="rotate(-14 3 2.5)" />
      <rect x="9.5" y="2" width="4" height="4" opacity=".55" />
      <rect x="17" y="1" width="4" height="4" />
      <rect x="1" y="9" width="4" height="4" opacity=".55" />
      <rect x="9" y="9" width="4" height="4" />
      <rect x="17" y="9" width="4" height="4" />
      <rect x="1" y="17" width="4" height="4" />
      <rect x="9" y="17" width="4" height="4" />
      <rect x="17" y="17" width="4" height="4" />
    </svg>
  );
}

export function Logo() {
  return (
    <a className={styles.logo} href="#top" aria-label="Imperius home">
      <LogoMark />
      Imperius
    </a>
  );
}
