import "./Skills.css";

const Skills = () => {
  return (
    <div className="skills-container">
      <div id="skillbuttons-div" className="active">
        <div id="frontend" className="skill-button">
          <i className="fa-solid fa-code"></i>
          <p>Front-end</p>
        </div>
        <div id="backend" className="skill-button">
          <i className="fa-solid fa-server"></i>
          <p>Back-end</p>
        </div>
        <div id="databases" className="skill-button">
          <i className="fa-solid fa-database"></i>
          <p>Databases</p>
        </div>
        <div id="tools" className="skill-button">
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <p>Tools</p>
        </div>
      </div>
      <div id="skillabout-div" style={{ display: "none" }}></div>
    </div>
  );
};

export default Skills;
