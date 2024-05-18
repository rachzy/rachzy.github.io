import { IModal } from "../../interfaces/modal";
import { IProject } from "../../interfaces/project";

import Title from "../Title/Title";
import "./ProjectItem.css";

interface IProps {
  project: IProject;
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
}

const ProjectItem: React.FC<IProps> = ({ project, setModal }) => {
  const handleButtonClick = () => {
    const newModal: IModal = {
      title: project.title,
      description: project.description,
      buttons: [],
      image: project.banner,
      tags: project.tags,
      enabled: true,
    };

    if (project.websiteUrl) {
      newModal.buttons?.push({
        title: "WEBSITE",
        url: project.websiteUrl,
        color: "chartreuse",
      });
    }

    if (project.repositoryUrl) {
      if (project.repositoryUrl.includes("discord")) {
        newModal.buttons?.push({
          title: "DISCORD",
          color: "#5865F2",
          url: project.repositoryUrl,
        });
      } else {
        newModal.buttons?.push({
          title: "REPOSITORY",
          url: project.repositoryUrl,
        });
      }
    }
    setModal(newModal);
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
