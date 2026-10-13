/** A source file or message in the "mess" illustration. x/y/r is the scattered pose, oy the ordered row. */
export type Chip = {
  label: string;
  tag?: string;
  arabic?: boolean;
  x: number;
  y: number;
  r: number;
  oy: number;
  delay: number;
};

export const chips: Chip[] = [
  { label: "sales_march_v2_FINAL.xlsx", x: 30, y: 34, r: -7, oy: 24, delay: 0 },
  { label: "POS export, branch 3.csv", x: 160, y: 96, r: 5, oy: 74, delay: 0.06 },
  { label: "واتساب: ٣ كراتين، بكرا الصبح", arabic: true, x: 46, y: 150, r: 9, oy: 124, delay: 0.12 },
  { label: "Paper invoice #4471", x: 190, y: 212, r: -11, oy: 174, delay: 0.18 },
  { label: "Stock count", tag: "(Tuesday?)", x: 20, y: 268, r: 4, oy: 224, delay: 0.24 },
  { label: "Accountant's system", x: 150, y: 320, r: -5, oy: 274, delay: 0.3 },
  { label: "supplier_prices_2025.pdf", x: 230, y: 20, r: 13, oy: 324, delay: 0.36 },
];

export const painPoints = [
  { title: "Reports", text: "Someone builds them by hand, late, and they're out of date by the time they're read." },
  { title: "Decisions", text: "Made on gut feeling, because pulling the real numbers takes days." },
  { title: "Patterns", text: "Stock-outs, slow movers and lost customers stay invisible until they cost money." },
];
