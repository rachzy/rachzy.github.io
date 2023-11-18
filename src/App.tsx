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
import DownloadBox from "./Components/DownloadBox";

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
  websiteUrl?: string;
};

export type modal = {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  buttons?: {
    title: string;
    color?: string;
    url: string;
  }[];
  enabled: boolean;
};

export type downloadOption = {
  id: string;
  label: string;
  subOptions?: downloadOption;
  downloadFile?: string;
}[];

function App() {
  const [modal, setModal] = useState<modal>({
    title: "",
    description: "",
    image: "",
    buttons: [],
    enabled: false,
  });
  const [resumeOptionsVisible, setResumeOptionsVisible] = useState(false);

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
          class: "fa-brands fa-docker",
          color: "#0db7ed",
          title: "Docker",
          isHTML: false,
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
      repositoryUrl: "https://github.com/rachzy/Oncoffee",
      websiteUrl: "https://rachzy.github.io/Oncoffee",
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
      title: "Rede Cabral",
      briefDescription: "The portfolio of a Brazilian franchise.",
      description: `I was thrilled to be entrusted with the development of an exciting 
      project for the renowned franchise, Rede Cabral, located in the vibrant region of 
      Minas Gerais. Leveraging the power of React and TypeScript, I meticulously crafted 
      a collection of captivating landing pages that exude creativity and innovation. 
      These pages seamlessly blend aesthetics with functionality, leaving a lasting impression
      on visitors.`,
      thumbnail: "redecabral-thumbnail.png",
      banner: "redecabral-banner.png",
      tags: ["HTML", "CSS", "TypeScript", "React"],
      repositoryUrl: "https://github.com/rachzy/projeto-cabral",
      websiteUrl: "https://redecabral.com.br",
    },
    {
      title: "Agrocafé",
      briefDescription:
        "The portfolio of a company focused on the development of the agribusiness of my city.",
      description: `In this project, I developed a standout landing page for a reputable irrigation 
      services company. Leveraging React and Typescript, I efficiently created a unique and impressive 
      page. Despite the challenge of ensuring flawless performance across all devices, I successfully 
      delivered an exceptional project. The client was delighted with the outcome, and I gained valuable
       experience in web development through this collaboration. Looking forward to future challenges!`,
      thumbnail: "agrocafe2-thumbnail.png",
      banner: "agrocafe2-banner.png",
      tags: ["HTML", "CSS", "TypeScript", "React"],
      repositoryUrl: "https://github.com/rachzy/agrocafe-2",
      websiteUrl: "https://www.agrocafe.com",
    },
    {
      title: "Agrocafé Irrigação",
      briefDescription:
        "The portfolio of a coffee irrigation company of my city.",
      description: `In this project, I developed a standout landing page for a reputable irrigation 
      services company. Leveraging React and Typescript, I efficiently created a unique and impressive 
      page. Despite the challenge of ensuring flawless performance across all devices, I successfully 
      delivered an exceptional project. The client was delighted with the outcome, and I gained valuable
       experience in web development through this collaboration. Looking forward to future challenges!`,
      thumbnail: "agrocafe-thumbnail.png",
      banner: "agrocafe-banner.jpg",
      tags: ["HTML", "CSS", "TypeScript", "React"],
      repositoryUrl: "https://github.com/rachzy/agrocafe",
      websiteUrl: "http://www.agrocafeirrigacao.com.br",
    },
    {
      title: "Hubtel",
      briefDescription: `A completely redesigned layout for the "Services" page of a Telecom company in Goiás.`,
      description: `For this one, I had the job to recreate the layout of the "Services" page of a telecommunication 
      company in Goiás. Me and my team were able to build something compact and quite modern, able to fit in the screens of
      every single device commonly used today. I've also worked on making the back-end able to work fine and attend the requirements
      of the new layout, leading me to modify the structure of the database and the application's legacy source code.`,
      thumbnail: "hubtel-thumbnail.png",
      banner: "hubtel-banner.png",
      tags: ["HTML", "CSS", "PHP", "MySQL", "Bootstrap"],
      repositoryUrl: "https://github.com/rachzy/hubtel-planos",
      websiteUrl: "https://hubtel.com.br",
    },
    {
      title: "HigheR",
      briefDescription:
        "A portfolio website for a fictional company that creates futuristic technology",
      description: `This project was a collaborative school assignment where I worked with 
      three classmates to create a functional website for a company, real or fictional. We 
      decided to invent our own fictional company called "Higher" that specialized in futuristic 
      technology like hoverboards, holograms, and spaceships, which we were all passionate about. 
      Our goal was to design a unique website that blended modern web application layouts with a 
      completely original design. My specific role was to transform the design concept from Figma 
      into a functional web application using React with TypeScript, aiming to deliver the best user 
      experience possible.
      `,
      thumbnail: "higher-thumbnail.png",
      banner: "higher-banner.png",
      tags: ["HTML", "CSS", "TypeScript", "React"],
      repositoryUrl: "https://github.com/oBST01/HigheR",
      websiteUrl: "https://rachzy.github.io/HigheR",
    },
    {
      title: "Criar Ideias",
      briefDescription:
        "The portfolio of a company I've worked for in the past.",
      description: `I had the privilege of contributing to the creation of a captivating 
      portfolio website for the first company I've ever worked for. While building upon the 
      solid foundation of pure HTML and CSS developed by my talented teammates, 
      I seamlessly integrated React and TypeScript to enhance its functionality 
      and interactivity. The process was immensely gratifying, as we collectively 
      crafted a cutting-edge landing page that boasts an exceptional design. The 
      culmination of our efforts yielded an awe-inspiring final result that truly 
      stands out in today's modern digital landscape.`,
      thumbnail: "criarideias-thumbnail.png",
      banner: "criarideias-banner.png",
      tags: ["HTML", "CSS", "TypeScript", "React"],
      repositoryUrl: "https://github.com/criarideias/criarideias-front",
      websiteUrl: "https://criarideias.com.br",
    },
    {
      title: "Geoespinhaço",
      briefDescription:
        "A demo website for a research made by a geography teacher.",
      description: `A Website developed for a teacher in my school, which was created together
      with my team in "Farmando XP", a project developed by my teacher Gilberto to help students
      that want to follow the career of software/web development to get some more experience and be
      able to find new opportunities as soon as possible. As it was our first project, we decided to
      go slow and make it simpler, but still we've reached something great and that could fit the wishes
      of the teacher, who loved it.`,
      thumbnail: "geoespinhaco-thumbnail.svg",
      banner: "geoespinhaco-banner.png",
      tags: ["HTML", "CSS", "JavaScript"],
      repositoryUrl: "https://github.com/Farmando-XP/geoespinhaco",
      websiteUrl: "https://farmando-xp.github.io/geoespinhaco/",
    },
    {
      title: "Botânica",
      briefDescription:
        "A portfolio website for a virtual store of natural products.",
      description: `A portfolio developed for the owner of a virtual store, by me and
      my team in "Farmando XP", a project developed by my teacher Gilberto to help students
      that want to follow the career of software/web development to get some more experience and be
      able to find new opportunities as soon as possible. As our second project, we tried to make
      something more sophisticated than our last one, but we still didn't use any framework or new
      technology, since that wouldn't be necessary for such a small project. The final result was great
      and I loved to see the growth and evolution of my team along with the development! The owner of
      Botânica really liked the final result.`,
      thumbnail: "botanica-thumbnail.png",
      banner: "botanica-banner.png",
      tags: ["HTML", "CSS"],
      repositoryUrl: "https://github.com/Farmando-XP/botanica",
      websiteUrl: "https://farmando-xp.github.io/botanica/",
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

  const downloadOptions: downloadOption = [
    {
      id: "portuguese-lang",
      label: "Portuguese (BR)",
      subOptions: [
        {
          id: "Henrique_Ferreira_CV",
          label: "Complete Resume",
          downloadFile: "resume-portuguese.pdf",
        },
        {
          id: "Henrique_Ferreira_CV_Simplificado",
          label: "Simplified Resume",
          downloadFile: "resume-portuguese-simplified.pdf",
        },
      ],
    },
    {
      id: "Henrique_Ferreira_Resume",
      label: "English",
      downloadFile: "resume.pdf",
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
              <Button
                onClick={() =>
                  setResumeOptionsVisible((currentValue) => !currentValue)
                }
              >
                <i className="fa-solid fa-download"></i> My Resume
              </Button>
              <DownloadBox
                downloadOptions={downloadOptions}
                visible={resumeOptionsVisible}
              />
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
