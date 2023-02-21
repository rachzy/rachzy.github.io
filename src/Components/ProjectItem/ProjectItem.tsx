import { modal, project } from "../../App";
import Title from "../Title/Title";
import "./ProjectItem.css";

interface IProps {
  project: project;
  setModal: React.Dispatch<React.SetStateAction<modal>>;
}

const ProjectItem: React.FC<IProps> = ({ project, setModal }) => {
  const handleButtonClick = () => {
    const newModal: modal = {
      title: project.title,
      description: project.description,
      image: project.banner,
      tags: project.tags,
      enabled: true,
    };

    if (project.repositoryUrl) {
      if (project.repositoryUrl.includes("discord")) {
        newModal.button = {
          title: "DISCORD",
          color: "#5865F2",
          url: project.repositoryUrl,
        };
      } else {
        newModal.button = {
          title: "REPOSITORY",
          url: project.repositoryUrl,
        };
      }

      setModal(newModal);
    }
  };
  return (
    <div className="project">
      <div>
        <img
          className="thumbnail"
          src={require(`../../assets/${project.thumbnail}`)}
          alt={project.title}
        />
        <Title color="white">{project.title}</Title>
      </div>
      <p className="brief-description">{project.briefDescription}</p>
      <button className="project-button" onClick={handleButtonClick}>
        MORE DETAILS <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </button>
    </div>
  );
};

export default ProjectItem;
