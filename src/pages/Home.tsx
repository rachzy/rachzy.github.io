/* eslint-disable jsx-a11y/img-redundant-alt -- the spec mandates this alt text */
import { profile } from "../data/profile";
import { socials } from "../data/socials";
import { socialIcons } from "../components/icons";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <img
        className={styles.avatar}
        src={`${process.env.PUBLIC_URL}/images/pfp.jpg`}
        alt="Henrique's profile picture, Killua from Hunter x Hunter"
        width={148}
        height={148}
      />
      <h1 className={styles.name}>{profile.handle}</h1>
      <p className={styles.fullName}>{profile.fullName}</p>
      <p className={styles.tagline}>{profile.tagline}</p>
      <p className={styles.note}>{profile.note}</p>
      <nav aria-label="Social links" className={styles.socials}>
        {socials.map((s) => {
          const Icon = socialIcons[s.id];
          return (
            <a
              key={s.id}
              href={s.href}
              aria-label={s.label}
              className={styles.social}
              {...(s.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon size={22} />
            </a>
          );
        })}
      </nav>
    </div>
  );
}
