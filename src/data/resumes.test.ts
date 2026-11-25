import { resumes } from "./resumes";

test("resumes order and names", () => {
  expect(resumes.map((r) => r.id)).toEqual(["en", "pt"]);
  expect(resumes.map((r) => r.label)).toEqual(["English", "Portuguese"]);
  expect(resumes.map((r) => r.flag)).toEqual(["us", "br"]);
  expect(resumes.map((r) => r.downloadName)).toEqual([
    "CV_Henrique_Ferreira.pdf",
    "CV_Henrique_Ferreira_Portuguese.pdf",
  ]);
  for (const r of resumes) {
    expect(r.href.endsWith(r.downloadName)).toBe(true);
    expect(r.href.startsWith(process.env.PUBLIC_URL as string)).toBe(true);
  }
});

test("hrefs honor PUBLIC_URL", () => {
  const old = process.env.PUBLIC_URL;
  process.env.PUBLIC_URL = "/sub";
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("./resumes");
    for (const r of mod.resumes) {
      expect(r.href.startsWith("/sub/resumes/")).toBe(true);
    }
  });
  process.env.PUBLIC_URL = old;
});
