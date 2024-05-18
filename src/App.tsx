import { Fragment, useState } from "react";
import "./App.css";

import skills from "./data/skills.json";
import projects from "./data/projects.json";
import downloadOptions from "./data/downloadOptions.json";

import BottomRightWrapper from "./components/BottomRightWrapper/BottomRightWrapper";
import Button from "./components/Button/Button";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LeftWrapper from "./components/LeftWrapper/LeftWrapper";
import Menu from "./components/Menu/Menu";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import PersonalWidgets from "./components/PersonalWidgets/PersonalWidgets";
import Projects from "./components/Projects/Projects";
import RightWrapper from "./components/RightWrapper/RightWrapper";
import Section from "./components/Section/Section";
import Separator from "./components/Separator/Separator";
import Skills from "./components/Skills/Skills";
import Terminal from "./components/Terminal/Terminal";
import TopLeftWrapper from "./components/TopLeftWrapper/TopLeftWrapper";
import Modal from "./modal";
import DownloadBox from "./components/DownloadBox";

import { IModal } from "./interfaces/modal";

function App() {
  const [modal, setModal] = useState<IModal>({
    title: "",
    description: "",
    image: "",
    buttons: [],
    enabled: false,
  });
  const [resumeOptionsVisible, setResumeOptionsVisible] = useState(false);

  const ProfilePicture = require("./assets/fox.jpg");

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
                setVisible={setResumeOptionsVisible}
              />
            </div>
          </TopLeftWrapper>
        </LeftWrapper>
        <RightWrapper>
          <BottomRightWrapper>
            <Terminal
              input="Roses are red, violets are blue"
              output="Syntax error, in line 32."
            />
          </BottomRightWrapper>
        </RightWrapper>
      </Header>
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
