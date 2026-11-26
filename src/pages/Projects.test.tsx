import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import { mockMatchMedia } from "../testUtils";

beforeEach(() => mockMatchMedia(false));

test("four projects in order with correct links", () => {
  const { container } = render(<Projects />);
  expect(
    screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
  ).toEqual(["Antares", "Larawag", "Shaula", "Fang"]);
  for (const n of ["Antares", "Larawag", "Shaula", "Fang"]) {
    expect(screen.getByRole("link", { name: `${n} on GitHub` })).toHaveAttribute(
      "href",
      `https://github.com/rachzy/${n.toLowerCase()}`
    );
  }
  const sites = screen.getAllByRole("link", { name: /website$/ });
  expect(sites.map((s) => s.getAttribute("href"))).toEqual([
    "https://antares.rachzy.com",
    "http://larawag.rachzy.dev/",
  ]);
  const featured = container.querySelectorAll('article[data-featured="true"]');
  expect(featured).toHaveLength(1);
  expect(featured[0]).toHaveTextContent("Antares");
  expect(screen.getByLabelText("Project pages")).toHaveTextContent("1");
});
