import { useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Pager from "../components/Pager/Pager";
import { GlobeIcon, projectIcons, socialIcons } from "../components/icons";
import { PROJECTS_PER_PAGE, projects } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { paginate } from "../utils/paginate";
import styles from "./Projects.module.css";

export default function Projects() {
  const [page, setPage] = useState(1);
  const reduced = useReducedMotion();
  const view = paginate(projects, page, PROJECTS_PER_PAGE);
  const GithubIcon = socialIcons.github;

  return (
    <>
      <PageHeader title="Projects" />
      <div className={styles.grid}>
        {view.items.map((p) => {
          const Icon = projectIcons[p.id];
          return (
            <article
              key={p.id}
              className={styles.project}
              data-featured={p.featured ? "true" : undefined}
              data-reduced-motion={reduced ? "true" : undefined}
            >
              <div className={styles.top}>
                <Icon size={36} className={styles.icon} />
                <h2 className={styles.name}>{p.name}</h2>
              </div>
              <p className={styles.description}>{p.description}</p>
              <div className={styles.links}>
                <a
                  href={p.repoUrl}
                  className={styles.link}
                  aria-label={`${p.name} on GitHub`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon size={20} />
                </a>
                {p.siteUrl && (
                  <a
                    href={p.siteUrl}
                    className={styles.link}
                    aria-label={`${p.name} website`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GlobeIcon size={20} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <Pager page={view.page} pageCount={view.pageCount} onChange={setPage} />
    </>
  );
}
