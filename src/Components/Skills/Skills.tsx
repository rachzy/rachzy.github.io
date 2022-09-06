import { MutableRefObject, useEffect, useRef, useState } from "react";
import SkillButton from "../SkillButton/SkillButton";
import SkillItem from "../SkillItem/SkillItem";
import Title from "../Title/Title";
import "./Skills.css";

type icons = {
  class: string;
  title: string;
  isHTML: boolean;
  innerHTML?: string;
}[];

type skill = {
  id: string;
  title: string;
  icons: icons;
  mainIconClass: string;
};

const Skills = () => {
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

  const skills: skill[] = [
    {
      id: "frontend",
      title: "Front-end",
      icons: [
        {
          class: "fa-brands fa-html5",
          title: "HTML",
          isHTML: false,
        },
        {
          class: "fa-brands fa-css3-alt",
          title: "CSS",
          isHTML: false,
        },
        {
          class: "fa-brands fa-js",
          title: "JavaScript",
          isHTML: false,
        },
        {
          class: "",
          title: "TypeScript",
          innerHTML: '<span class="iconify" data-icon="cib:typescript"></span>',
          isHTML: true,
        },
        {
          class: "fa-brands fa-react",
          title: "React",
          isHTML: false,
        },
        {
          class: "fa-brands fa-react",
          title: "React Native",
          isHTML: false,
        },
      ],
      mainIconClass: "fa-solid fa-code",
    },
    {
      id: "backend",
      title: "Back-end",
      icons: [
        {
          class: "fa-brands fa-node-js",
          title: "Node.JS",
          isHTML: false,
        },
        {
          class: "fa-brands fa-php",
          title: "PHP",
          isHTML: false,
        },
        {
          class: "fa-brands fa-python",
          title: "Python",
          isHTML: false,
        },
      ],
      mainIconClass: "fa-solid fa-server",
    },
    {
      id: "databases",
      title: "Databases",
      icons: [
        {
          class: "icon-mysql",
          title: "MySQL",
          isHTML: false,
        },
        {
          class: "icon-mongodb",
          title: "MongoDB",
          isHTML: false,
        },
      ],
      mainIconClass: "fa-solid fa-database",
    },
    {
      id: "tools",
      title: "Tools",
      icons: [
        {
          class: "",
          title: "VS Code",
          innerHTML:
            '<span class="iconify" data-icon="bxl:visual-studio"></span>',
          isHTML: true,
        },
        {
          class: "fa-brands fa-git-alt",
          title: "Git",
          isHTML: false,
        },
        {
          class: "icon-shell",
          title: "Terminal",
          innerHTML:
            '<span class="iconify" data-icon="bi:terminal-fill"></span>',
          isHTML: true,
        },
      ],
      mainIconClass: "fa-solid fa-screwdriver-wrench",
    },
  ];

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
