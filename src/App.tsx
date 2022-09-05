import React, { Fragment } from "react";
import "./App.css";

import BottomRightWrapper from "./Components/BottomRightWrapper/BottomRightWrapper";
import Button from "./Components/Button/Button";
import Header from "./Components/Header/Header";
import LeftWrapper from "./Components/LeftWrapper/LeftWrapper";
import Menu from "./Components/Menu/Menu";
import PersonalInfo from "./Components/PersonalInfo/PersonalInfo";
import PersonalWidgets from "./Components/PersonalWidgets/PersonalWidgets";
import ProjectItem from "./Components/ProjectItem/ProjectItem";
import RightWrapper from "./Components/RightWrapper/RightWrapper";
import Section from "./Components/Section/Section";
import Separator from "./Components/Separator/Separator";
import Skills from "./Components/Skills/Skills";
import Terminal from "./Components/Terminal/Terminal";
import TopLeftWrapper from "./Components/TopLeftWrapper/TopLeftWrapper";

export interface IProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  repositoryUrl: string;
}


function App() {
  const projects: IProject[] = [
    {
      title: "Oncoffee",
      description: "OnCoffee is an e-commerce marketplace that is focused on selling everything related to coffee, from simple coffee bags to coffee preparing machines. The project is being developed using JavaScript Slack (ReactJS and Node).",
      image: "Oncoffee.png",
      repositoryUrl: "https://github.com/rachzy/oncoffee",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node", "MySQL"]
    }
  ] 

  const renderProjects = (): JSX.Element[] => {
    return projects.map((project) => {
      return <ProjectItem project={project} />
    })
  }

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
              <a href="https://github.com/rachzy" target={"_blank"} rel="noreferrer">
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
        <Skills />
      </Section>
      <Section id="projects" title="Projects">
        {renderProjects()}
      </Section>
    </Fragment>
  );
}

export default App;
