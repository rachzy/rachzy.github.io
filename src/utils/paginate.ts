export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): { items: T[]; page: number; pageCount: number } {
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const wanted = Number.isFinite(page) ? Math.floor(page) : 1;
  const current = Math.min(Math.max(wanted, 1), pageCount);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, pageCount };
}
