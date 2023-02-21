import SkillItem from "../SkillItem/SkillItem";
import "./Skills.css";

import { skill } from "../../App";

interface IProps {
  skills: skill[];
}

const Skills: React.FC<IProps> = ({ skills }) => {
  return (
    <div
      className="skills-container"
    >
        {skills.map((skillSet) => {
          return skillSet.icons.map((icon) => {
            return (
              <SkillItem
                key={icon.title}
                color={icon.color}
                iconClass={icon.class}
                innerHTML={icon.innerHTML || ""}
                isHTML={icon.isHTML}
              >
                {icon.title}
              </SkillItem>
            );
          });
        })}
    </div>
  );
};

export default Skills;
