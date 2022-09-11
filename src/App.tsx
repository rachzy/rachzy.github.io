import React, { Fragment } from "react";
import "./App.css";

import BottomRightWrapper from "./Components/BottomRightWrapper/BottomRightWrapper";
import Button from "./Components/Button/Button";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LeftWrapper from "./Components/LeftWrapper/LeftWrapper";
import Menu from "./Components/Menu/Menu";
import PersonalInfo from "./Components/PersonalInfo/PersonalInfo";
import PersonalWidgets from "./Components/PersonalWidgets/PersonalWidgets";
import Projects from "./Components/Projects/Projects";
import RightWrapper from "./Components/RightWrapper/RightWrapper";
import Section from "./Components/Section/Section";
import Separator from "./Components/Separator/Separator";
import Skills from "./Components/Skills/Skills";
import Terminal from "./Components/Terminal/Terminal";
import TopLeftWrapper from "./Components/TopLeftWrapper/TopLeftWrapper";

export type skill = {
  id: string;
  title: string;
  icons: {
    class: string;
    title: string;
    isHTML: boolean;
    innerHTML?: string;
  }[];
  mainIconClass: string;
};

export type project = {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  repositoryUrl: string;
};

function App() {
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

  const projects: project[] = [
    {
      title: "Oncoffee",
      description: `OnCoffee is an e-commerce marketplace that is focused on selling
          everything related to coffee, from simple coffee bags to coffee
          preparing machines. The project is being developed using JavaScript Slack (ReactJS and Node).`,
      images: ["Oncoffee.png"],
      tags: ["HTML", "CSS", "JavaScript", "React", "Node", "MySQL"],
      repositoryUrl: "https://github.com/rachzy/oncoffee",
    },
    {
      title: "Fastalk",
      description: `Fastalk was a Fast-Chat by Rooms website with video-calls that I loved developing. 
        It got many users, but I shutted it down because I had no investment to keep it online.
        It was developed using PHP and JavaScript`,
      images: ["Fastalk.png"],
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      repositoryUrl: "https://github.com/rachzy/fastalk",
    },
    {
      title: "Space Invaders",
      description: `A game that I developed to learn more about pygame and train my python skills`,
      images: ["SpaceInvaders.png"],
      tags: ["Python"],
      repositoryUrl: "https://github.com/rachzy/space-invaders",
    },
    {
      title: "Feather",
      description: `A mobile app designed to remotely control a fictional hoverboard`,
      images: ["Feather-1.png", "Feather-2.png"],
      tags: ["React Native", "Typescript"],
      repositoryUrl: "https://github.com/rachzy/feather",
    },
  ];

  return (
    <Fragment>
      <Header>
        <Menu />
        <LeftWrapper>
          <TopLeftWrapper id="main-text">
            <div className="greeting">
              <p>👋 Hello World, my name is</p>
              <h1>Henrique</h1>
              <h2>Web Developer</h2>
              <a
                href="https://github.com/rachzy"
                target={"_blank"}
                rel="noreferrer"
              >
                <Button>
                  <i className="fa-brands fa-github"></i> My GitHub
                </Button>
              </a>
            </div>
          </TopLeftWrapper>
        </LeftWrapper>
        <RightWrapper>
          <BottomRightWrapper>
            <Terminal />
          </BottomRightWrapper>
        </RightWrapper>
      </Header>
      <Section id="about" title="About">
        <PersonalInfo />
        <Separator />
        <PersonalWidgets />
      </Section>
      <Section id="skills" title="Skills">
        <Skills skills={skills} />
      </Section>
      <Section id="projects" title="Projects" column={true}>
        <Projects projects={projects} />
      </Section>
      <Section id="contact" title="Contact">
        <Contact />
      </Section>
      <Footer />
    </Fragment>
  );
}

export default App;
