export type RoadmapStatus = "In pilot" | "Next" | "Planned";

export const roadmap: { v: string; title: string; text: string; status: RoadmapStatus }[] = [
  { v: "V1", title: "Analytics foundation", text: "Reports, dashboards and plain-language questions.", status: "In pilot" },
  { v: "V2", title: "Inventory intelligence", text: "Stock levels, movement and reorder signals.", status: "Next" },
  { v: "V3", title: "Root cause analysis", text: "Why a number moved, traced to its source.", status: "Planned" },
  { v: "V4", title: "Recommendations", text: "What to do next, ranked by impact.", status: "Planned" },
  { v: "V5", title: "Predictive intelligence", text: "What will happen, before it happens.", status: "Planned" },
  { v: "V6", title: "Multi-agent platform", text: "Specialized agents for analytics, inventory, marketing and operations.", status: "Planned" },
  { v: "V7", title: "Operational intelligence", text: "POS, ERP, CRM, cameras and sensors in one layer.", status: "Planned" },
];
