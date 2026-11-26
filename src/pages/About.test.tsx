import { render, screen } from "@testing-library/react";
import About from "./About";
import { aboutRows } from "../data/profile";

test("lists every row in order", () => {
  const { container } = render(<About />);
  expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
  const dts = Array.from(container.querySelectorAll("dt")).map((e) => e.textContent);
  const dds = Array.from(container.querySelectorAll("dd")).map((e) => e.textContent);
  expect(dts).toEqual(aboutRows.map((r) => r.label));
  expect(dds).toEqual(aboutRows.map((r) => r.value));
  expect(dds[0]).toBe("February 25th");
  expect(screen.getByText("Currently reading")).toBeInTheDocument();
  expect(
    screen.getByText("Astrophysics & Cosmology, Sci-fi, Cybersecurity, Anime & Manga")
  ).toBeInTheDocument();
});
