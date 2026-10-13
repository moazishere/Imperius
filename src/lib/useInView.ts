"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Becomes true the first time the element is at least `threshold` visible, then stays true.
 * Browsers without IntersectionObserver are treated as "in view".
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.5) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return seen;
}
