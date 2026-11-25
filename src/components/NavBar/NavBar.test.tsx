import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

test("links in order with hrefs", () => {
  render(<NavBar active="home" />);
  const links = screen.getAllByRole("link");
  expect(links.map((l) => l.textContent)).toEqual(["About", "Projects", "Resume"]);
  expect(links.map((l) => l.getAttribute("href"))).toEqual([
    "#/about",
    "#/projects",
    "#/resume",
  ]);
  expect(links.some((l) => l.hasAttribute("aria-current"))).toBe(false);
});

test("only the active link is current", () => {
  render(<NavBar active="projects" />);
  const current = screen
    .getAllByRole("link")
    .filter((l) => l.getAttribute("aria-current") === "page");
  expect(current.map((l) => l.textContent)).toEqual(["Projects"]);
});
