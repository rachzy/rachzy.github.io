import { Fragment } from "react";

import { IModal } from "../../interfaces/modal";
import { IProject } from "../../interfaces/project";

import ProjectItem from "../ProjectItem/ProjectItem";

interface IProps {
  projects: IProject[];
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
}

const Projects: React.FC<IProps> = ({ projects, setModal }) => {
  return (
    <Fragment>
      {projects.map((project) => {
        return (
          <ProjectItem
            key={project.title}
            project={project}
            setModal={setModal}
          />
        );
      })}
    </Fragment>
  );
};

export default Projects;
