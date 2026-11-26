import { act, renderHook } from "@testing-library/react";
import { parseHash, routeHref, useHashRoute } from "./useHashRoute";

test("parseHash maps valid hashes", () => {
  for (const h of ["", "#", "#/"]) expect(parseHash(h)).toBe("home");
  expect(parseHash("#/about")).toBe("about");
  expect(parseHash("#/projects")).toBe("projects");
  expect(parseHash("#/resume")).toBe("resume");
});

test("parseHash falls back to home", () => {
  for (const h of ["#about", "#/nope", "#/about/extra", "#/ABOUT"]) {
    expect(parseHash(h)).toBe("home");
  }
});

test("routeHref", () => {
  expect(routeHref("home")).toBe("#/");
  expect(routeHref("about")).toBe("#/about");
  expect(routeHref("projects")).toBe("#/projects");
  expect(routeHref("resume")).toBe("#/resume");
});

test("useHashRoute follows hashchange and cleans up", () => {
  window.location.hash = "";
  const remove = jest.spyOn(window, "removeEventListener");
  const { result, unmount } = renderHook(() => useHashRoute());
  expect(result.current).toBe("home");
  act(() => {
    window.location.hash = "#/resume";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(result.current).toBe("resume");
  unmount();
  expect(remove).toHaveBeenCalledWith("hashchange", expect.any(Function));
  remove.mockRestore();
});
