import { Section } from "@/components/ui/Section";
import { pilotBenefits } from "@/content/pilot";
import { PilotForm } from "./PilotForm";
import styles from "./Pilot.module.css";

export function Pilot() {
  return (
    <Section id="pilot" innerClassName={styles.pilot}>
      <div>
        <p className="eyebrow">Start with a pilot</p>
        <h2>
          See your own business, <span className="dim">clearly, for the first time.</span>
        </h2>
        <p className="lead">
          We&apos;re taking on a small number of pilot companies. You get the product on your real data and direct access
          to the team building it.
        </p>
        <ul className={styles.list}>
          {pilotBenefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <PilotForm />
    </Section>
  );
}
