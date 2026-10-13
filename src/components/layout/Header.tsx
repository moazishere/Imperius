"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { headerLinks, pilotLink } from "@/content/nav";
import { cx } from "@/lib/cx";
import styles from "./Header.module.css";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 8, () => false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <div className={cx("wrap", styles.nav)}>
        <Logo />
        <nav className={styles.links} aria-label="Main">
          {headerLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={styles.end}>
          <ButtonLink size="small" href={pilotLink.href}>
            {pilotLink.label}
          </ButtonLink>
          <button
            ref={menuBtn}
            className={styles.menuBtn}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div
        className={cx("wrap", styles.mobileMenu)}
        id="mobile-menu"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "A") setOpen(false);
        }}
      >
        {[...headerLinks, pilotLink].map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
