import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pager from "./Pager";

test("single page disables both arrows", () => {
  render(<Pager page={1} pageCount={1} />);
  expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
});

test("next moves forward and last page disables next", () => {
  const onChange = jest.fn();
  const { rerender } = render(<Pager page={1} pageCount={2} onChange={onChange} />);
  userEvent.click(screen.getByRole("button", { name: "Next page" }));
  expect(onChange).toHaveBeenCalledWith(2);
  rerender(<Pager page={2} pageCount={2} onChange={onChange} />);
  expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Previous page" })).toBeEnabled();
});
