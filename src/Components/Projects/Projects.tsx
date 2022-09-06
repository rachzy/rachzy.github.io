import { Fragment } from "react";
import { project } from "../../App";
import ProjectItem from "../ProjectItem/ProjectItem";

interface IProps {
  projects: project[];
}

const Projects: React.FC<IProps> = ({ projects }) => {
  return (
    <Fragment>
      {projects.map((project) => {
        return <ProjectItem key={project.title} project={project} />;
      })}
    </Fragment>
  );
};

export default Projects;
