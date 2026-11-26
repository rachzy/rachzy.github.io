import { Route, routeHref } from "../../hooks/useHashRoute";
import styles from "./NavBar.module.css";

const items: { route: Exclude<Route, "home">; label: string }[] = [
  { route: "about", label: "About" },
  { route: "projects", label: "Projects" },
  { route: "resume", label: "Resume" },
];

export default function NavBar({ active }: { active: Route }) {
  return (
    <nav aria-label="Sections" className={styles.nav}>
      {items.map(({ route, label }) => (
        <a
          key={route}
          href={routeHref(route)}
          className={route === active ? `${styles.cell} ${styles.active}` : styles.cell}
          aria-current={route === active ? "page" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
