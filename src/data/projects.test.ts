import { projects, PROJECTS_PER_PAGE } from "./projects";

test("projects order, colors and links", () => {
  expect(projects.map((p) => p.name)).toEqual([
    "Antares",
    "Larawag",
    "Shaula",
    "Fang",
  ]);
  expect(projects.map((p) => p.accent)).toEqual([
    "#ff9a3d",
    "#b99cff",
    "#5aa5ff",
    "#4fd38a",
  ]);
  expect(projects.filter((p) => p.featured).map((p) => p.id)).toEqual([
    "antares",
  ]);
  expect(projects.filter((p) => p.siteUrl).map((p) => p.siteUrl)).toEqual([
    "https://antares.rachzy.com",
    "http://larawag.rachzy.dev/",
  ]);
  for (const p of projects) {
    expect(p.repoUrl).toBe(`https://github.com/rachzy/${p.id}`);
  }
  expect(PROJECTS_PER_PAGE).toBe(4);
});

test("descriptions are verbatim", () => {
  expect(projects.map((p) => p.description)).toEqual([
    "Look at the sky, pinpoint a star and start hunting for exoplanets.",
    "Three.js library for building and visualizing 3D stellar and planetary systems.",
    "Python pipeline that extracts exoplanet-detection features from light curves using transit photometry.",
    "Machine learning model that flags potential exoplanets from pre-processed light curve data.",
  ]);
});
