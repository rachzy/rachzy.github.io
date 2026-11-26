import PageHeader from "../components/PageHeader/PageHeader";
import { DownloadIcon, Flag } from "../components/icons";
import { resumes } from "../data/resumes";
import styles from "./Resume.module.css";

export default function Resume() {
  return (
    <>
      <PageHeader title="Resume" />
      <div className={styles.buttons}>
        {resumes.map((r) => (
          <a
            key={r.id}
            href={r.href}
            download={r.downloadName}
            className={styles.button}
          >
            <Flag code={r.flag} size={36} />
            <span className={styles.text}>
              <span className={styles.label}>{r.label}</span>
              <span className={styles.kind}>PDF</span>
            </span>
            <DownloadIcon size={24} className={styles.download} />
          </a>
        ))}
      </div>
    </>
  );
}
