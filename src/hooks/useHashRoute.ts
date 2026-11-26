import { useEffect, useState } from "react";

export type Route = "home" | "about" | "projects" | "resume";

const HASHES: Record<string, Route> = {
  "": "home",
  "#": "home",
  "#/": "home",
  "#/about": "about",
  "#/projects": "projects",
  "#/resume": "resume",
};

export function parseHash(hash: string): Route {
  return Object.prototype.hasOwnProperty.call(HASHES, hash)
    ? HASHES[hash]
    : "home";
}

export function routeHref(route: Route): string {
  return route === "home" ? "#/" : `#/${route}`;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash)
  );
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    onChange();
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
