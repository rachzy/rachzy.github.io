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
