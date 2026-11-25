import type { ComponentType } from "react";
import Background from "./components/Background/Background";
import Card from "./components/Card/Card";
import { Route, useHashRoute } from "./hooks/useHashRoute";
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
  const Page = pages[route];
  return (
    <>
      <Background />
      <Card route={route}>
        <Page />
      </Card>
    </>
  );
}
