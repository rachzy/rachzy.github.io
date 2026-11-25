import { render, screen, within } from "@testing-library/react";
import Home from "./Home";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

test("shows identity and copy", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("rachzy");
  expect(screen.getByText("Henrique Ferreira")).toBeInTheDocument();
  expect(screen.getByText(profile.tagline)).toBeInTheDocument();
  expect(screen.getByText(profile.note)).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    expect.stringMatching(/\/images\/pfp\.jpg$/)
  );
});

test("social links are ordered and safe", () => {
  render(<Home />);
  const links = within(
    screen.getByRole("navigation", { name: "Social links" })
  ).getAllByRole("link");
  expect(links.map((l) => l.getAttribute("aria-label"))).toEqual([
    "Discord",
    "Gmail",
    "GitHub",
    "Steam",
    "Bluesky",
    "LinkedIn",
  ]);
  links.forEach((l, i) => {
    expect(l).toHaveAttribute("href", socials[i].href);
    if (socials[i].external) {
      expect(l).toHaveAttribute("target", "_blank");
      expect(l).toHaveAttribute("rel", "noopener noreferrer");
    } else {
      expect(l).not.toHaveAttribute("target");
      expect(l).not.toHaveAttribute("rel");
    }
  });
});
