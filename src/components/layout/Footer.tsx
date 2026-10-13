import { Logo } from "@/components/ui/Logo";
import { footerLinks } from "@/content/nav";
import styles from "./Footer.module.css";

async function CurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.foot}>
          <div>
            <Logo />
            <p>Turning chaos into knowledge, one business at a time.</p>
          </div>
          <nav aria-label="Footer">
            {footerLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.legal}>
          <span>
            © <CurrentYear /> Imperius
          </span>
          <span>Damascus · Built for every market</span>
        </div>
      </div>
    </footer>
  );
}
