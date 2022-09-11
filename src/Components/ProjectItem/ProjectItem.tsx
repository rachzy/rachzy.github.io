import { project } from "../../App";
import Button from "../Button/Button";
import Title from "../Title/Title";
import "./ProjectItem.css";

interface IProps {
  project: project;
}

const ProjectItem: React.FC<IProps> = ({ project }) => {
  return (
    <div className="project">
      <div className="project-description">
        <Title>{project.title}</Title>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => {
            return <span key={tag}>{tag}</span>;
          })}
        </div>
        <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
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
