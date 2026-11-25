import { render, screen, within } from "@testing-library/react";
import Card from "./Card";

test("Home link is current on home", () => {
  render(<Card route="home">x</Card>);
  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
});

test("Home link is a plain link elsewhere", () => {
  render(<Card route="about">content</Card>);
  const home = screen.getByRole("link", { name: "Home" });
  expect(home).not.toHaveAttribute("aria-current");
  expect(home).toHaveAttribute("href", "#/");
  expect(within(screen.getByRole("main")).getByText("content")).toBeInTheDocument();
});

test("watermark is hidden from assistive tech", () => {
  render(<Card route="home">x</Card>);
  expect(screen.getByText("神速")).toHaveAttribute("aria-hidden", "true");
});
