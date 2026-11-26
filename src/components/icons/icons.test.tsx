import { render, screen } from "@testing-library/react";
import { projectIcons, socialIcons, Flag, ChevronIcon } from ".";

test("every social icon renders a hidden svg", () => {
  for (const [id, Icon] of Object.entries(socialIcons)) {
    const { container, unmount } = render(<Icon />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    unmount();
    expect(id).toBeTruthy();
  }
});

test("every project icon renders a hidden svg", () => {
  for (const Icon of Object.values(projectIcons)) {
    const { container, unmount } = render(<Icon />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    unmount();
  }
});

test("flags are named images", () => {
  render(
    <>
      <Flag code="us" />
      <Flag code="br" />
    </>
  );
  expect(screen.getByRole("img", { name: "United States flag" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Brazil flag" })).toBeInTheDocument();
});

test("two Larawag icons get different mask ids", () => {
  const L = projectIcons.larawag;
  const { container } = render(
    <>
      <L />
      <L />
    </>
  );
  const ids = Array.from(container.querySelectorAll("mask")).map((m) => m.id);
  expect(ids).toHaveLength(2);
  expect(ids[0]).not.toBe(ids[1]);
});

test("chevron renders", () => {
  const { container } = render(<ChevronIcon direction="left" />);
  expect(container.querySelector("svg")).not.toBeNull();
});
