import { paginate } from "./paginate";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

test("four items fit one page", () => {
  const r = paginate(range(4), 1, 4);
  expect(r.pageCount).toBe(1);
  expect(r.items).toHaveLength(4);
  expect(r.page).toBe(1);
});

test("five items make two pages", () => {
  expect(paginate(range(5), 1, 4).pageCount).toBe(2);
  expect(paginate(range(5), 2, 4).items).toHaveLength(1);
});

test("invalid pages clamp", () => {
  expect(paginate(range(5), 0, 4).page).toBe(1);
  expect(paginate(range(5), 99, 4).page).toBe(2);
  expect(paginate(range(5), NaN, 4).page).toBe(1);
});

test("empty list has one empty page", () => {
  expect(paginate([], 1, 4)).toEqual({ items: [], page: 1, pageCount: 1 });
});
