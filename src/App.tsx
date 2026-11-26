import type { ComponentType } from "react";
import Background from "./components/Background/Background";
import Card from "./components/Card/Card";
import { Route, useHashRoute } from "./hooks/useHashRoute";
import { useRouteTransition } from "./hooks/useRouteTransition";
import styles from "./App.module.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";

const pages: Record<Route, ComponentType> = {
  home: Home,
  about: About,
  projects: Projects,
  resume: Resume,
};

export default function App() {
  const route = useHashRoute();
  const { shown, leaving } = useRouteTransition(route);
  const Page = pages[shown];
  return (
    <>
      <Background />
      <Card route={route}>
        <div
          key={shown}
          className={leaving ? `${styles.page} ${styles.leaving}` : styles.page}
        >
          <Page />
        </div>
      </Card>
    </>
  );
}
