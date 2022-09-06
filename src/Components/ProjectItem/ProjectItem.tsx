import { project } from "../../App";
import Button from "../Button/Button";
import "./ProjectItem.css";

interface IProps {
  project: project;
}

const ProjectItem: React.FC<IProps> = ({ project }) => {
  return (
    <div className="project">
      <div className="project-description">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.technologies.map((technology) => {
            return <span key={technology}>{technology}</span>;
          })}
        </div>
        <a href={project.repositoryUrl}>
          <Button>
            PROJECT REPOSITORY{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </Button>
        </a>
      </div>
      <div className="project-image">
        <img
          src={require(`../../assets/${project.image}`)}
          alt={project.title}
        />
      </div>
    </div>
  );
};

export default ProjectItem;
