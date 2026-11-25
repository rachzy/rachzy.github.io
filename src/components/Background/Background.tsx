import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./Background.module.css";

export default function Background() {
  const reduced = useReducedMotion();
  const base = `${process.env.PUBLIC_URL}/media`;
  const poster = `${base}/killua-poster.jpg`;
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.sky} />
      {reduced ? (
        <img className={styles.hero} src={poster} alt="" />
      ) : (
        <video
          className={styles.hero}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          poster={poster}
        >
          <source src={`${base}/killua.webm`} type='video/webm; codecs="vp9"' />
          <source src={`${base}/killua.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
