import { Fragment } from "react";
import { modal, project } from "../../App";
import ProjectItem from "../ProjectItem/ProjectItem";

interface IProps {
  projects: project[];
  setModal: React.Dispatch<React.SetStateAction<modal>>;
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
