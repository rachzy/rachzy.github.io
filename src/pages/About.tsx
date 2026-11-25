import PageHeader from "../components/PageHeader/PageHeader";
import { aboutRows } from "../data/profile";
import styles from "./About.module.css";

export default function About() {
  return (
    <>
      <PageHeader title="About" />
      <dl className={styles.list}>
        {aboutRows.map((row) => (
          <div
            key={row.label}
            className={
              row.groupStart ? `${styles.row} ${styles.group}` : styles.row
            }
          >
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
