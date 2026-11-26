import type { ReactNode } from "react";
import type { Route } from "../../hooks/useHashRoute";
import HomeButton from "../HomeButton/HomeButton";
import NavBar from "../NavBar/NavBar";
import styles from "./Card.module.css";

export default function Card({
  route,
  children,
}: {
  route: Route;
  children: ReactNode;
}) {
  return (
    <div className={styles.stage}>
      <div className={styles.card}>
        <div className={styles.edge} aria-hidden="true" />
        <div className={styles.face} data-route={route}>
          <span className={styles.watermark} aria-hidden="true">
            神速
          </span>
          <HomeButton current={route === "home"} />
          <main className={styles.main}>{children}</main>
          <NavBar active={route} />
        </div>
      </div>
    </div>
  );
}
