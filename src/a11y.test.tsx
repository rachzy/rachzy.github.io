import { render, screen } from "@testing-library/react";
import App from "./App";
import { mockMatchMedia } from "./testUtils";

const routes = ["", "#/about", "#/projects", "#/resume"];

describe.each(routes)("route %p", (hash) => {
  beforeEach(() => {
    mockMatchMedia(false);
    window.location.hash = hash;
  });

  test("has exactly one h1", () => {
    render(<App />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  test("links and buttons have accessible names", () => {
    render(<App />);
    for (const el of [...screen.queryAllByRole("link"), ...screen.queryAllByRole("button")]) {
      expect(el).toHaveAccessibleName();
      expect((el.getAttribute("aria-label") ?? el.textContent ?? "").trim()).not.toBe("");
    }
  });

  test("images have an alt attribute", () => {
    const { container } = render(<App />);
    container.querySelectorAll("img").forEach((img) => {
      expect(img.hasAttribute("alt")).toBe(true);
    });
  });
});

test("reduced motion is flagged on the featured project", () => {
  mockMatchMedia(true);
  window.location.hash = "#/projects";
  const { container } = render(<App />);
  const antares = container.querySelector('article[data-featured="true"]');
  expect(antares).toHaveAttribute("data-reduced-motion", "true");
  expect(container.querySelector("video")).toBeNull();
});

test("motion is not flagged by default", () => {
  mockMatchMedia(false);
  window.location.hash = "#/projects";
  const { container } = render(<App />);
  expect(
    container.querySelector('article[data-featured="true"]')
  ).not.toHaveAttribute("data-reduced-motion");
});
