import { ChevronIcon } from "../icons";
import styles from "./Pager.module.css";

export default function Pager({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange?: (page: number) => void;
}) {
  return (
    <nav aria-label="Project pages" className={styles.pager}>
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      >
        <ChevronIcon direction="left" size={18} />
      </button>
      <span className={styles.page} aria-current="page">
        {page}
      </span>
      <button
        type="button"
        className={styles.arrow}
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onChange?.(page + 1)}
      >
        <ChevronIcon direction="right" size={18} />
      </button>
    </nav>
  );
}
