export type ProjectId = "antares" | "larawag" | "shaula" | "fang";

export type Project = {
  id: ProjectId;
  name: string;
  description: string;
  accent: string;
  featured?: boolean;
  repoUrl: string;
  siteUrl?: string;
};

export const PROJECTS_PER_PAGE = 4;

export const projects: Project[] = [
  {
    id: "antares",
    name: "Antares",
    description:
      "Look at the sky, pinpoint a star and start hunting for exoplanets.",
    accent: "#ff9a3d",
    featured: true,
    repoUrl: "https://github.com/rachzy/antares",
    siteUrl: "https://antares.rachzy.com",
  },
  {
    id: "larawag",
    name: "Larawag",
    description:
      "Three.js library for building and visualizing 3D stellar and planetary systems.",
    accent: "#b99cff",
    repoUrl: "https://github.com/rachzy/larawag",
    siteUrl: "http://larawag.rachzy.dev/",
  },
  {
    id: "shaula",
    name: "Shaula",
    description:
      "Python pipeline that extracts exoplanet-detection features from light curves using transit photometry.",
    accent: "#5aa5ff",
    repoUrl: "https://github.com/rachzy/shaula",
  },
  {
    id: "fang",
    name: "Fang",
    description:
      "Machine learning model that flags potential exoplanets from pre-processed light curve data.",
    accent: "#4fd38a",
    repoUrl: "https://github.com/rachzy/fang",
  },
];
