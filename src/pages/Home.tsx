/* eslint-disable jsx-a11y/img-redundant-alt -- the spec mandates this alt text */
import { profile } from "../data/profile";
import { socials } from "../data/socials";
import { socialIcons } from "../components/icons";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.identity}>
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
      <p className={styles.love}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 13.6C8 13.6 2.2 10.2 2.2 6.4A3.1 3.1 0 0 1 8 4.9a3.1 3.1 0 0 1 5.8 1.5C13.8 10.2 8 13.6 8 13.6z"
            fill="var(--accent)"
          />
        </svg>
        {profile.interests}
      </p>
      </div>
      <div className={styles.footer}>
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
    </div>
  );
}
