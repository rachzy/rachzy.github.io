import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { mockMatchMedia } from "./testUtils";

beforeEach(() => mockMatchMedia(false));

function renderAt(hash: string) {
  window.location.hash = hash;
  return render(<App />);
}

test.each([
  ["#/about", "About"],
  ["#/projects", "Projects"],
  ["#/resume", "Resume"],
  ["", "rachzy"],
  ["#/nope", "rachzy"],
])("%s renders heading %s", (hash, name) => {
  renderAt(hash);
  expect(screen.getByRole("heading", { level: 1, name })).toBeInTheDocument();
});

test("clicking a nav link switches the page", async () => {
  renderAt("");
  userEvent.click(screen.getByRole("link", { name: "Projects" }));
  expect(
    await screen.findByRole("heading", { level: 1, name: "Projects" })
  ).toBeInTheDocument();
});

test("old page stays until the fade-out ends, then the new one shows", async () => {
  renderAt("");
  userEvent.click(screen.getByRole("link", { name: "About" }));
  // the nav already reflects the new route
  await screen.findByRole("link", { name: "About", current: "page" });
  expect(screen.getByRole("heading", { level: 1, name: "rachzy" })).toBeInTheDocument();
  expect(
    await screen.findByRole("heading", { level: 1, name: "About" })
  ).toBeInTheDocument();
});

test("reduced motion swaps pages without waiting", async () => {
  mockMatchMedia(true);
  renderAt("");
  userEvent.click(screen.getByRole("link", { name: "About" }));
  expect(
    await screen.findByRole("heading", { level: 1, name: "About" })
  ).toBeInTheDocument();
});
