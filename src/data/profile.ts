export const profile: {
  handle: string;
  fullName: string;
  tagline: string;
  interests: string;
  note: string;
} = {
  handle: "rachzy",
  fullName: "Henrique Ferreira",
  tagline: "Software engineer, currently working in OT cybersecurity.",
  interests: "Cybersec, Machine Learning, Astrophysics",
  note: "BYI: I'm not interested on internships / non-remote jobs; I hate audios; I hv mod/sev ADHD; I usually forget answering people",
};

export type AboutRow = { label: string; value: string; groupStart?: boolean };

export const aboutRows: AboutRow[] = [
  { label: "Birthday", value: "February 25th" },
  { label: "Working at", value: "Unvoid" },
  { label: "Enrolled at", value: "Information Systems, UFU (2024-2028)" },
  {
    label: "Tech fields",
    value: "Cybersecurity, AI/Harness Engineering, Automation, Web",
  },
  { label: "Based in", value: "Uberlândia, Brasil" },
  {
    label: "Languages",
    value: "Portuguese (native), English (fluent), Japanese (learning)",
  },
  {
    label: "Interests",
    value: "Astrophysics & Cosmology, Sci-fi, Cybersecurity, Anime & Manga",
    groupStart: true,
  },
  { label: "Currently playing", value: "Cyberpunk 2077, No Man's Sky, CS2" },
  { label: "Currently reading", value: "Kagurabachi, HxH" },
  {
    label: "Currently studying",
    value: "Transit Photometry, Linear Algebra, Supervised Learning",
  },
];
