export type Lang = "en" | "ar";
export type Text = Record<Lang, string>;
export type QuestionKey = "happened" | "why" | "next";

export const demoQuestions: { key: QuestionKey; label: Text; q: Text; a: Text }[] = [
  {
    key: "happened",
    label: { en: "What happened", ar: "شو صار" },
    q: { en: "How did sales do this week?", ar: "كيف كانت المبيعات هالأسبوع؟" },
    a: {
      en: "Revenue is down 6% on last week. One product explains most of it: Floor cleaner 4L, down 31%.",
      ar: "الإيرادات نازلة ٦٪ عن الأسبوع الماضي. منتج واحد مسؤول عن أغلب النزول: منظف الأرضيات ٤ ليتر، نازل ٣١٪.",
    },
  },
  {
    key: "why",
    label: { en: "Why it happened", ar: "ليش صار" },
    q: { en: "Why did floor cleaner drop?", ar: "ليش نزل منظف الأرضيات؟" },
    a: {
      en: "82% of the drop came from three Damascus branches that ran out of stock on Tuesday. Where shelves were full, demand held steady.",
      ar: "٨٢٪ من النزول جاي من ٣ فروع بدمشق خلص عندها المخزون يوم الثلاثاء. بالفروع اللي كان فيها بضاعة، الطلب ضل ثابت.",
    },
  },
  {
    key: "next",
    label: { en: "What to do next", ar: "شو الخطوة الجاية" },
    q: { en: "What should we do about it?", ar: "شو لازم نعمل؟" },
    a: {
      en: "Restock the three branches from the Aleppo warehouse today, and set an alert so it doesn't happen again.",
      ar: "عبّي الفروع الثلاثة من مستودع حلب اليوم، وحط تنبيه لحتى ما تتكرر.",
    },
  },
];

export const demoChrome = {
  tryQuestion: { en: "Try a question", ar: "جرّب سؤال" },
  topLabel: { en: "Imperius · sample data", ar: "Imperius · بيانات توضيحية" },
  footer: {
    en: "Sources: POS, inventory · 4 branches · sample data for illustration",
    ar: "المصادر: نقاط البيع، المخزون · ٤ فروع · بيانات توضيحية",
  },
};

/** Floor cleaner units per day, as % of chart height. `low` marks days below the weekly average. */
export const salesChart = {
  label: {
    en: "Daily units of floor cleaner sold: about 120 on Monday and Tuesday, then about 70 a day from Wednesday to Sunday",
    ar: "المبيعات اليومية لمنظف الأرضيات: حوالي ١٢٠ قطعة يومي الاثنين والثلاثاء، وبعدين حوالي ٧٠ باليوم من الأربعاء للأحد",
  },
  bars: [
    { day: { en: "Mon", ar: "اثن" }, height: 92, low: false },
    { day: { en: "Tue", ar: "ثلا" }, height: 88, low: false },
    { day: { en: "Wed", ar: "أرب" }, height: 54, low: true },
    { day: { en: "Thu", ar: "خمي" }, height: 48, low: true },
    { day: { en: "Fri", ar: "جمع" }, height: 57, low: true },
    { day: { en: "Sat", ar: "سبت" }, height: 51, low: true },
    { day: { en: "Sun", ar: "أحد" }, height: 53, low: true },
  ],
  legend: {
    series: { en: "Floor cleaner 4L, units per day", ar: "منظف الأرضيات ٤ ليتر، قطعة باليوم" },
    low: { en: "Below weekly average", ar: "تحت المعدل الأسبوعي" },
  },
};

export const branchTable = {
  headers: {
    branch: { en: "Branch", ar: "الفرع" },
    before: { en: "Mon–Tue", ar: "اثن–ثلا" },
    after: { en: "Wed–Sun", ar: "أرب–أحد" },
    shelf: { en: "Shelf", ar: "الرف" },
  },
  status: {
    out: { en: "Out", ar: "خالص" },
    stocked: { en: "Stocked", ar: "متوفر" },
  },
  rows: [
    { branch: { en: "Mezzeh", ar: "المزة" }, before: 118, after: 0, out: true },
    { branch: { en: "Malki", ar: "المالكي" }, before: 96, after: 0, out: true },
    { branch: { en: "Bab Touma", ar: "باب توما" }, before: 84, after: 6, out: true },
    { branch: { en: "Kafr Souseh", ar: "كفرسوسة" }, before: 102, after: 243, out: false },
  ],
};

export const nextActions = {
  approve: { en: "Approve", ar: "اعتمد" },
  approved: { en: "Approved", ar: "تم الاعتماد" },
  items: [
    {
      text: {
        en: "Move 240 units from the Aleppo warehouse to Mezzeh, Malki and Bab Touma",
        ar: "انقل ٢٤٠ قطعة من مستودع حلب للمزة والمالكي وباب توما",
      },
      impact: { en: "Recovers about 70% of lost weekly sales", ar: "بيرجّع حوالي ٧٠٪ من مبيعات الأسبوع الضايعة" },
    },
    {
      text: {
        en: "Alert the branch manager when floor cleaner falls below 60 units",
        ar: "نبّه مدير الفرع لما ينزل منظف الأرضيات تحت ٦٠ قطعة",
      },
      impact: { en: "Prevents the same stock-out next month", ar: "بيمنع نفس النقص الشهر الجاي" },
    },
  ],
};
