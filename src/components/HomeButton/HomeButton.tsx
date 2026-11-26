import { routeHref } from "../../hooks/useHashRoute";
import { HomeIcon } from "../icons";
import styles from "./HomeButton.module.css";

export default function HomeButton({ current }: { current: boolean }) {
  return (
    <a
      href={routeHref("home")}
      className={current ? `${styles.home} ${styles.current}` : styles.home}
      aria-current={current ? "page" : undefined}
    >
      <HomeIcon size={18} className={styles.icon} />
      <span>Home</span>
    </a>
  );
}
