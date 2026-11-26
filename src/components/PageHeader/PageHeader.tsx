import { profile } from "../../data/profile";
import styles from "./PageHeader.module.css";

export default function PageHeader({ title }: { title: string }) {
  return (
    <header className={styles.header}>
      <img
        className={styles.avatar}
        src={`${process.env.PUBLIC_URL}/images/pfp.jpg`}
        alt=""
        width={56}
        height={56}
      />
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          {profile.handle}, {profile.fullName}
        </p>
      </div>
    </header>
  );
}
