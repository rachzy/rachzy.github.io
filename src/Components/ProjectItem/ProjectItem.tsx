import {IProject} from "../../App";

interface IProps {
  project: IProject;
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
            <button>
            PROJECT REPOSITORY{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
        </a>
      </div>
      <div className="project-image">
        <img src={require(`../../assets/${project.image}`)} alt={project.title} />
      </div>
    </div>
  );
};

export default ProjectItem;
