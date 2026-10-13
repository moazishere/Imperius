"use client";

import { useEffect, useRef, type RefObject } from "react";
import { BUST_BACKGROUND, BUST_COLS, BUST_DOTS } from "@/lib/bustGrid";

type Dot = {
  c: number; r: number; k: number;
  tx: number; ty: number; size: number; // settled position and size
  sx: number; sy: number; s0: number; // scattered start
  delay: number; dur: number; swirl: number;
  ox: number; oy: number; // pointer push offset
};

const INTRO_MS = 1900;

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Draws the bust over the whole hero: dots fly in from random points and settle into the
 * slot's grid, then drift away from the cursor. The loop stops itself when nothing moves.
 * Bump `replay` to scatter again.
 */
export function BustCanvas({
  heroRef,
  slotRef,
  replay,
  className,
}: {
  heroRef: RefObject<HTMLElement | null>;
  slotRef: RefObject<HTMLElement | null>;
  replay: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scatterRef = useRef<() => void>(() => {});

  useEffect(() => {
    const hero = heroRef.current, slot = slotRef.current, canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!hero || !slot || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cs = getComputedStyle(document.documentElement);
    const ink = cs.getPropertyValue("--ink").trim() || "#141414";
    const dotBg = cs.getPropertyValue("--grid-dot").trim() || "#D2D2CC";

    const dots: Dot[] = BUST_DOTS.map((d) => ({
      ...d, tx: 0, ty: 0, size: 0, sx: 0, sy: 0, s0: 0, delay: 0, dur: 0, swirl: 0, ox: 0, oy: 0,
    }));
    let W = 0, H = 0, dpr = 1, cell = 0, sx0 = 0, sy0 = 0;
    let start = 0, animating = false, running = false, frame = 0;
    let pointer: { x: number; y: number } | null = null;

    function layout() {
      const hr = hero!.getBoundingClientRect(), sr = slot!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = hr.width; H = hr.height;
      canvas!.width = Math.round(W * dpr); canvas!.height = Math.round(H * dpr);
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      cell = sr.width / BUST_COLS;
      sx0 = sr.left - hr.left; sy0 = sr.top - hr.top;
      for (const d of dots) {
        d.tx = sx0 + (d.c + 0.5) * cell;
        d.ty = sy0 + (d.r + 0.5) * cell;
        d.size = (0.12 + 0.72 * d.k) * cell;
      }
    }

    function scatter() {
      for (const d of dots) {
        d.sx = Math.random() * W;
        d.sy = Math.random() * H;
        d.s0 = cell * (0.15 + Math.random() * 0.75);
        d.delay = Math.random() * 450;
        d.dur = 1250 + Math.random() * 300;
        d.swirl = (Math.random() - 0.5) * 140;
      }
      start = performance.now();
      animating = !reduce;
      kick();
    }

    function draw(now: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      const progress = animating ? Math.min(1, (now - start) / INTRO_MS) : 1;

      ctx!.globalAlpha = progress;
      ctx!.fillStyle = dotBg;
      const b = Math.max(1, cell * 0.14);
      for (const p of BUST_BACKGROUND) {
        ctx!.fillRect(sx0 + (p.c + 0.5) * cell - b / 2, sy0 + (p.r + 0.5) * cell - b / 2, b, b);
      }
      ctx!.globalAlpha = 1;

      ctx!.fillStyle = ink;
      let moving = false, energy = 0;
      const R = Math.max(48, cell * 12);
      for (const d of dots) {
        let x: number, y: number, s: number;
        if (animating) {
          const t = Math.min(1, Math.max(0, (now - start - d.delay) / d.dur));
          if (t < 1) moving = true;
          const e = ease(t), arc = Math.sin(Math.PI * e) * d.swirl;
          x = d.sx + (d.tx - d.sx) * e + arc * 0.5;
          y = d.sy + (d.ty - d.sy) * e + arc;
          s = d.s0 + (d.size - d.s0) * e;
        } else {
          x = d.tx; y = d.ty; s = d.size;
        }

        let px = 0, py = 0;
        if (pointer && !animating) {
          const dx = d.tx - pointer.x, dy = d.ty - pointer.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.01) {
            const f = Math.pow(1 - dist / R, 2) * R * 0.45;
            px = (dx / dist) * f; py = (dy / dist) * f;
          }
        }
        d.ox += (px - d.ox) * 0.18;
        d.oy += (py - d.oy) * 0.18;
        energy += Math.abs(d.ox) + Math.abs(d.oy);
        ctx!.fillRect(x + d.ox - s / 2, y + d.oy - s / 2, s, s);
      }
      if (animating && !moving) animating = false;
      return animating || energy > 0.5 || !!pointer;
    }

    function loop(now: number) {
      if (draw(now)) frame = requestAnimationFrame(loop);
      else running = false;
    }
    function kick() {
      if (!running) { running = true; frame = requestAnimationFrame(loop); }
    }

    function onPointerMove(ev: PointerEvent) {
      if (ev.pointerType === "touch") return;
      const hr = hero!.getBoundingClientRect();
      pointer = { x: ev.clientX - hr.left, y: ev.clientY - hr.top };
      kick();
    }
    function onPointerLeave() { pointer = null; kick(); }

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    layout();
    const ro = new ResizeObserver(() => { layout(); kick(); });
    ro.observe(hero);
    scatterRef.current = scatter;
    if (reduce) kick(); else scatter();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      scatterRef.current = () => {};
    };
  }, [heroRef, slotRef]);

  useEffect(() => {
    if (replay > 0) scatterRef.current();
  }, [replay]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
