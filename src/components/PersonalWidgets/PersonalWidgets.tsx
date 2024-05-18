import { MutableRefObject, useEffect, useRef, useState } from "react";
import Title from "../Title/Title";
import Widget from "../Widget/Widget";
import "./PersonalWidgets.css";

type widget = {
  id: string;
  title: string;
  iconClass: string;
  content: string;
};

const PersonalWidgets = () => {
  const [widgetAboutOpen, setWidgetAboutOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState<widget>();

  const [widgetsDiv, widgetsAbout] = [
    useRef() as MutableRefObject<HTMLDivElement>,
    useRef() as MutableRefObject<HTMLDivElement>,
  ];

  useEffect(() => {
    if (!widgetsDiv.current || !widgetsAbout.current) return;
    if (widgetAboutOpen) {
      widgetsDiv.current.style.display = "none";
      widgetsAbout.current.style.display = "flex";
      widgetsAbout.current.classList.add("active");
      return;
    }
    widgetsAbout.current.style.display = "none";
    widgetsDiv.current.style.display = "flex";
    widgetsDiv.current.classList.add("active");
  }, [widgetAboutOpen, widgetsAbout, widgetsDiv]);

  const widgets: widget[] = [
    {
      id: "personal",
      title: "Personal Info",
      iconClass: "fa fa-person",
      content: `
      <b>Name:</b> Henrique Ferreira <br>
      <b>Birthday:</b> February, 25th <br>
      <b>Gender:</b> Male (He/Him) <br>
      <b>Location:</b> Minas Gerais, Brazil <br>
      <b>Occupation:</b> Full-Stack Developer at Unvoid <br>
      <b>Student at:</b> Federal University of Uberlândia (UFU) <br>
      `,
    },
    {
      id: "education",
      title: "Education",
      iconClass: "fa fa-graduation-cap",
      content: `
          <b>Institution:</b> Federal University of Uberlândia (UFU) <br>
        <b>Course:</b> Bachelor in Information Science<br>
        <b>Duration:</b> 4 years (2024 - 2027)<br>
        <b>Status:</b> Cursing<br> <br>

        <b>Institution:</b> Federal Institue of Triângulo Mineiro <br>
        <b>Course:</b> Technical in IT<br>
        <b>Duration:</b> 3 years (2021 - 2023)<br>
        <b>Status:</b> Finished<br> <br>

        <b>Institution:</b> Federal Institue of Triângulo Mineiro <br>
        <b>Course:</b> English (B2)<br>
        <b>Duration:</b> 1 year (2021)<br>
        <b>Status:</b> Finished
        `,
    },
    {
      id: "languages",
      title: "Languages",
      iconClass: "fa fa-earth-americas",
      content: `
      <b>Portuguese:</b> Native <br>
      <b>English:</b> Fluent
      `,
    },
    {
      id: "story",
      title: "My Story",
      iconClass: "fa-solid fa-book",
      content: `My first contact with lines of code came in 2018, when I tried to develop my own Roblox games using
      Lua Script and Minecraft plugins using Java. Even though I didn't go too far on it in that time, my passion
      for coding was born there. Some years later, in 2020, I started on Web-Developing and I created my first project:
      Patrocitizens (Unfinished), which was supposed to be a social media for my city. I made it on PHP only.
      In the end of 2020, I started the development of a project called Fastalk, which was a fast-chat with rooms.
      I made it with PHP and some JavaScript in some parts. After ending that project, I started another one some 
      months later with my friend, called OnCoffee, that I was developing using ReactJS and NodeJS.`,
    },
  ];

  const handleWidgetClick = (widgetId: string) => {
    const getWidget = widgets.filter((widget) => widget.id === widgetId)[0];
    setCurrentWidget(getWidget);
    setWidgetAboutOpen(true);
  };

  const handleBackClick = () => {
    setWidgetAboutOpen(false);
  };

  const returnWidgetButtons = (): JSX.Element[] => {
    return widgets.map((widget) => {
      return (
        <Widget
          key={widget.id}
          id={widget.id}
          onClick={handleWidgetClick.bind(this, widget.id)}
          iconClass={widget.iconClass}
        >
          {widget.title}
        </Widget>
      );
    });
  };

  return (
    <div className="personal-widgets">
      <Title>{"> More"}</Title>
      <div className="widgets-container">
        <div className="widgets" ref={widgetsDiv}>
          {returnWidgetButtons()}
        </div>
        <div
          className="widgets-about"
          ref={widgetsAbout}
          style={{ display: "none" }}
        >
          <Title>{currentWidget ? currentWidget.title : ""}</Title>
          <p
            id="about-content"
            dangerouslySetInnerHTML={{
              __html: currentWidget ? currentWidget.content : "",
            }}
          ></p>
          <button id="return" className="widget" onClick={handleBackClick}>
            <i className="fa-solid fa-return-arrow"></i>Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalWidgets;
