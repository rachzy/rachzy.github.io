import fs from "fs";
import path from "path";

const pub = path.resolve(__dirname, "../public");
const html = fs.readFileSync(path.join(pub, "index.html"), "utf8");

test("index.html loads only fonts we use and no old CDNs", () => {
  expect(html).toContain("Big+Shoulders+Display");
  expect(html).toContain("Barlow");
  expect(html).not.toContain("font-awesome");
  expect(html).not.toContain("iconify");
  expect(html).not.toContain("font-mfizz");
});

test("every local href/src in index.html exists in public/", () => {
  const refs = Array.from(html.matchAll(/(?:href|src)="([^"]+)"/g)).map(
    (m) => m[1]
  );
  const local = refs.filter((r) => !/^(https?:)?\/\//.test(r));
  expect(local.length).toBeGreaterThan(0);
  for (const r of local) {
    const rel = r.replace("%PUBLIC_URL%/", "");
    expect(fs.existsSync(path.join(pub, rel))).toBe(true);
  }
});
