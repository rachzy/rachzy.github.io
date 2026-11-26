import { render, screen } from "@testing-library/react";
import Resume from "./Resume";

test("download links in order", () => {
  render(<Resume />);
  const links = screen.getAllByRole("link");
  expect(links[0]).toHaveTextContent(/^English/);
  expect(links[1]).toHaveTextContent(/^Portuguese/);
  expect(links.map((l) => l.getAttribute("download"))).toEqual([
    "CV_Henrique_Ferreira.pdf",
    "CV_Henrique_Ferreira_Portuguese.pdf",
  ]);
  expect(links[0].getAttribute("href")).toMatch(/\/resumes\/CV_Henrique_Ferreira\.pdf$/);
  expect(links[1].getAttribute("href")).toMatch(
    /\/resumes\/CV_Henrique_Ferreira_Portuguese\.pdf$/
  );
  links.forEach((l) => expect(l).not.toHaveAttribute("target"));
});

test("hrefs honor PUBLIC_URL", () => {
  const env = process.env as Record<string, string | undefined>;
  const old = env.PUBLIC_URL;
  env.PUBLIC_URL = "/sub";
  let Isolated: typeof Resume = Resume;
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Isolated = require("./Resume").default;
  });
  env.PUBLIC_URL = old;
  const { container } = render(<Isolated />);
  const hrefs = Array.from(container.querySelectorAll("a")).map((a) =>
    a.getAttribute("href")
  );
  expect(hrefs).toHaveLength(2);
  hrefs.forEach((h) => expect(h).toMatch(/^\/sub\/resumes\//));
});
