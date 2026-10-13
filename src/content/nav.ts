export type NavLink = { href: string; label: string };

export const headerLinks: NavLink[] = [
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Product" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

export const pilotLink: NavLink = { href: "#pilot", label: "Book a pilot" };

export const footerLinks: NavLink[] = [
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Product" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#roadmap", label: "Roadmap" },
  pilotLink,
];
