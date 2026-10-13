import { Section, SectionHead } from "@/components/ui/Section";
import { Demo } from "./Demo";

export function DemoSection() {
  return (
    <Section id="demo">
      <SectionHead
        eyebrow="The product"
        title="Ask like you'd ask your best analyst."
        lead="Pick a question to see how Imperius answers. Switch languages to see it in Arabic."
      />
      <Demo />
    </Section>
  );
}
