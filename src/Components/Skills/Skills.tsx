import { MutableRefObject, useEffect, useRef, useState } from "react";
import SkillButton from "../SkillButton/SkillButton";
import SkillItem from "../SkillItem/SkillItem";
import Title from "../Title/Title";
import "./Skills.css";

import { skill } from "../../App";

interface IProps {
  skills: skill[]
}

const Skills: React.FC<IProps> = ({skills}) => {
  const [skillScreenOpen, setSkillScreenOpen] = useState(false);
  const [currentSkillAbout, setCurrentSkillAbout] = useState<skill>();

  const [skillAboutDiv, skillButtonsDiv] = [
    useRef() as MutableRefObject<HTMLDivElement>,
    useRef() as MutableRefObject<HTMLDivElement>,
  ];

  useEffect(() => {
    if (!skillAboutDiv.current || !skillButtonsDiv.current) return;
    if (skillScreenOpen) {
      skillButtonsDiv.current.classList.remove("active");

      setTimeout(() => {
        skillButtonsDiv.current.style.display = "none";
        skillAboutDiv.current.style.display = "block";
        skillAboutDiv.current.classList.add("active");
      }, 200);
      return;
    }

    skillAboutDiv.current.classList.remove("active");

    setTimeout(() => {
      skillAboutDiv.current.style.display = "none";
      skillButtonsDiv.current.style.display = "block";
      skillButtonsDiv.current.classList.add("active");
    }, 200);
  });

  const handleSkillButtonClick = (skillId: string) => {
    const getSkill = skills.filter((skill) => skill.id === skillId)[0];
    setCurrentSkillAbout(getSkill);
    setSkillScreenOpen(true);
  };

  const handleGoBackClick = () => {
    setSkillScreenOpen(false);
  };

  const returnSkillButtons = () => {
    return skills.map((skill) => {
      return (
        <SkillButton
          key={skill.id}
          iconClass={skill.mainIconClass}
          onClick={handleSkillButtonClick.bind(this, skill.id)}
        >
          {skill.title}
        </SkillButton>
      );
    });
  };

  return (
    <div className="skills-container">
      <div id="skillbuttons-div" ref={skillButtonsDiv} className="active">
        {returnSkillButtons()}
      </div>
      <div id="skillabout-div" ref={skillAboutDiv} style={{ display: "none" }}>
        <Title>{currentSkillAbout?.title || ""}</Title>
        {currentSkillAbout?.icons.map((icon) => {
          return (
            <SkillItem
              key={icon.title}
              iconClass={icon.class}
              innerHTML={icon.innerHTML || ""}
              isHTML={icon.isHTML}
            >
              {icon.title}
            </SkillItem>
          );
        })}
        <button onClick={handleGoBackClick}>Go Back</button>
      </div>
    </div>
  );
};

export default Skills;
