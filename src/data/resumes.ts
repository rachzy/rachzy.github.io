export type Resume = {
  id: "en" | "pt";
  label: "English" | "Portuguese";
  flag: "us" | "br";
  href: string;
  downloadName: string;
};

const base = `${process.env.PUBLIC_URL ?? ""}/resumes`;

export const resumes: Resume[] = [
  {
    id: "en",
    label: "English",
    flag: "us",
    href: `${base}/CV_Henrique_Ferreira.pdf`,
    downloadName: "CV_Henrique_Ferreira.pdf",
  },
  {
    id: "pt",
    label: "Portuguese",
    flag: "br",
    href: `${base}/CV_Henrique_Ferreira_Portuguese.pdf`,
    downloadName: "CV_Henrique_Ferreira_Portuguese.pdf",
  },
];
