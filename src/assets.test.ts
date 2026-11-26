import fs from "fs";
import path from "path";

const pub = path.resolve(__dirname, "../public");
const files = [
  "media/killua.webm",
  "media/killua.mp4",
  "media/killua-poster.jpg",
  "images/pfp.jpg",
  "resumes/CV_Henrique_Ferreira.pdf",
  "resumes/CV_Henrique_Ferreira_Portuguese.pdf",
  "CNAME",
];

test("all published assets exist", () => {
  for (const f of files) {
    const p = path.join(pub, f);
    expect(fs.existsSync(p)).toBe(true);
    expect(fs.readFileSync(p).length).toBeGreaterThan(0);
  }
});

test("CNAME keeps the custom domain", () => {
  expect(fs.readFileSync(path.join(pub, "CNAME"), "utf8").trim()).toBe(
    "rachzy.dev"
  );
});
