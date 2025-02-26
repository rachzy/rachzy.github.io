import { Fragment } from "react";
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
        color: "var(--primary-purple)",
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
    <Fragment>
      <div className="project">
        <img
          className="thumbnail"
          src={require(`../../assets/${project.thumbnail}`)}
          alt={project.title}
        />
        <div>
          <Title color="white">{project.title}</Title>
          <p className="brief-description">{project.briefDescription}</p>
        </div>
        <div>
          <button className="project-button" onClick={handleButtonClick}>
            MORE DETAILS{" "}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectItem;
