import React, { Fragment, useState } from "react";
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
import Modal from "./Modal";

export type skill = {
  id: string;
  title: string;
  icons: {
    class: string;
    color: string;
    title: string;
    isHTML: boolean;
    innerHTML?: string;
  }[];
  mainIconClass: string;
};

export type project = {
  title: string;
  briefDescription: string;
  description: string;
  thumbnail: string;
  banner: string;
  tags: string[];
  repositoryUrl?: string;
};

export type modal = {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  button?: {
    title: string;
    color?: string;
    url: string;
  };
  enabled: boolean;
};

function App() {
  const [modal, setModal] = useState<modal>({
    title: "",
    description: "",
    image: "",
    enabled: false,
  });

  const skills: skill[] = [
    {
      id: "frontend",
      title: "Front-end",
      icons: [
        {
          class: "fa-brands fa-html5",
          color: "#e34c26",
          title: "HTML",
          isHTML: false,
        },
        {
          class: "fa-brands fa-css3-alt",
          color: "#264de4",
          title: "CSS",
          isHTML: false,
        },
        {
          class: "fa-brands fa-js",
          color: "#F0DB4F",
          title: "JavaScript",
          isHTML: false,
        },
        {
          class: "",
          color: "#007acc",
          title: "TypeScript",
          innerHTML: '<span class="iconify" data-icon="cib:typescript"></span>',
          isHTML: true,
        },
        {
          class: "fa-brands fa-react",
          color: "#61DBFB",
          title: "React.JS",
          isHTML: false,
        },
        {
          class: "",
          color: "#61DBFB",
          title: "React Native",
          innerHTML:
            '<span class="iconify" data-icon="tabler:brand-react-native"></span>',
          isHTML: true,
        },
        {
          class: "",
          color: "white",
          title: "Next.JS",
          innerHTML:
            '<span class="iconify" data-icon="akar-icons:nextjs-fill"></span>',
          isHTML: true,
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
          color: "#68A063",
          title: "Node.JS",
          isHTML: false,
        },
        {
          class: "fa-brands fa-php",
          color: "#8993be",
          title: "PHP",
          isHTML: false,
        },
        {
          class: "fa-brands fa-python",
          color: "#FFE873",
          title: "Python",
          isHTML: false,
        },
        {
          class: "fa-brands fa-java",
          color: "#f89820",
          title: "Java",
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
          color: "#00758f",
          title: "MySQL",
          isHTML: false,
        },
        {
          class: "icon-mongodb",
          color: "#4DB33D",
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
          color: "#0078d7",
          innerHTML:
            '<span class="iconify" data-icon="bxl:visual-studio"></span>',
          isHTML: true,
        },
        {
          class: "",
          title: "IntelliJ IDEA",
          color: "#6B57FF",
          innerHTML:
            '<span class="iconify" data-icon="logos:intellij-idea"></span>',
          isHTML: true,
        },
        {
          class: "fa-brands fa-git-alt",
          color: "#F1502F",
          title: "Git",
          isHTML: false,
        },
        {
          class: "",
          color: "#F48120",
          title: "Cloudflare",
          innerHTML: '<span class="iconify" data-icon="cib:cloudflare"></span>',
          isHTML: true,
        },
        {
          class: "icon-shell",
          color: "gray",
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
      title: "Rede Sweden",
      briefDescription:
        "A Brazilian Complete Minecraft server focused on RankUP (redesweden.com)",
      description: `Sweden Network is a minecraft server that I created from 
      scratch with my friend Augusto. It took my entire summer vacations and 
      a full spigot course to make it, but I got awesome results, and it's my 
      favorite project so far. It got more than 100 players online simultaneously,
      and it currently has hundreds of members on its Discord. I sold the project
      since I didn't have enough time to focus on it and for other personal reasons.
      The server is still online, and you can access it through the IP: redesweden.com`,
      thumbnail: "sweden-thumbnail.png",
      banner: "sweden-banner.png",
      tags: ["Java", "MySQL"],
      repositoryUrl: "https://discord.io/redesweden",
    },
    {
      title: "Oncoffee",
      briefDescription:
        "An e-commerce marketplace focused on selling anything related to coffee",
      description: `OnCoffee is an e-commerce marketplace that is focused on selling
          everything related to coffee, from simple coffee bags to coffee
          preparing machines. The project is being developed using JavaScript Slack (ReactJS and Node).`,
      thumbnail: "oncoffee-thumbnail.png",
      banner: "oncoffee-banner.png",
      tags: ["HTML", "CSS", "JavaScript", "React", "Node", "MongoDB"],
      repositoryUrl: "https://github.com/rachzy/oncoffee",
    },
    {
      title: "Fastalk",
      briefDescription:
        "A chat room web application with video-calls, which you even join in public rooms",
      description: `Fastalk was a Fast-Chat by Rooms website with video-calls that I loved developing. 
        It got many users, but I shutted it down because I had no investment to keep it online.
        It was developed using PHP and JavaScript`,
      thumbnail: "fastalk-thumbnail.png",
      banner: "fastalk-banner.png",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      repositoryUrl: "https://github.com/rachzy/fastalk",
    },
    {
      title: "Animeasy",
      briefDescription: "A mobile application to easily watch animes.",
      description: `Animeasy is a "far from finished" project that I was developing just for fun 
      to help users to watch, see infos and share any anime that they want easily, for free and
      wherever they want (It's not released, please don't sue me TV Tokyo). It has a really cool
      design, even tho it's not finished yet.`,
      thumbnail: "animeasy-thumbnail.png",
      banner: "animeasy-thumbnail.png",
      tags: ["React Native", "Typescript"],
      repositoryUrl: "https://github.com/rachzy/animeasy",
    },
    {
      title: "Space Invaders",
      briefDescription: "The classic space invaders game!",
      description: `A game that I developed to learn more about pygame and train my python skills.`,
      thumbnail: "spaceinvaders-thumbnail.png",
      banner: "spaceinvaders-banner.png",
      tags: ["Python"],
      repositoryUrl: "https://github.com/rachzy/space-invaders-game",
    },
  ];

  return (
    <Fragment>
      <Modal modal={modal} setModal={setModal} />
      <Header>
        <Menu />
        <LeftWrapper>
          <TopLeftWrapper id="main-text">
            <div className="greeting">
              <p>👋 Hello World, my name is</p>
              <h1>Henrique</h1>
              <h2>Software Developer</h2>
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
      <Section id="projects" title="Projects" center={true}>
        <Projects projects={projects} setModal={setModal} />
      </Section>
      <Section id="contact" title="Contact">
        <Contact />
      </Section>
      <Footer />
    </Fragment>
  );
}

export default App;
