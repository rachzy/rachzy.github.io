import { Fragment, useState } from "react";
import "./App.css";

import skills from "./data/skills.json";
import projects from "./data/projects.json";

import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import PersonalWidgets from "./components/PersonalWidgets/PersonalWidgets";
import Projects from "./components/Projects/Projects";
import Section from "./components/Section/Section";
import Separator from "./components/Separator/Separator";
import Skills from "./components/Skills/Skills";
import Terminal from "./components/Terminal/Terminal";
import Modal from "./components/Modal";

import { IModal } from "./interfaces/modal";
import Greeting from "./components/Greeting/Greeting";

function App() {
  const [modal, setModal] = useState<IModal>({
    title: "",
    description: "",
    image: "",
    buttons: [],
    enabled: false,
  });

  const ProfilePicture = require("./assets/fox.jpg");

  return (
    <Fragment>
      <Modal modal={modal} setModal={setModal} />
      <Header />
      <main className="main-content" id="home">
        <Greeting />
        <Terminal
          input="Roses are red, violets are blue"
          output="Syntax error, in line 32."
        />
      </main>
      <Section id="about" title="About">
        <PersonalInfo
          pfp={{
            src: ProfilePicture,
            alt: "my-pfp",
            title: "I love artic foxes",
          }}
          description={`Hi! I'm Henrique, AKA rachzy, and I'm a Software Developer. I have
          experience on building web applications, mobile applications,
          minecraft plugins and REST APIs. I'm really into technology,
          entrepeneurship and really like learning new things. I'm currently
          working as a Full-Stack Developer at Unvoid.`}
        />
        <Separator />
        <PersonalWidgets />
      </Section>
      <Section id="skills" title="Skills">
        <Skills skills={skills} />
      </Section>
      <Section id="projects" title="Projects">
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
