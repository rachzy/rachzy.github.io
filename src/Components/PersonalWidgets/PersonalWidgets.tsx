import Title from "../Title/Title";
import "./PersonalWidgets.css";

const PersonalWidgets = () => {
  return (
    <div className="personal-widgets">
      <Title>{"> More"}</Title>
      <div className="widgets-container">
        <div className="widgets">
          <button id="personal" className="widget">
            <i className="fa fa-person"></i> Personal Info
          </button>
          <button id="education" className="widget">
            <i className="fa fa-graduation-cap"></i> Education
          </button>
          <button id="languages" className="widget">
            <i className="fa fa-earth-americas"></i> Languages
          </button>
          <button id="story" className="widget">
            <i className="fa-solid fa-book"></i> My Story
          </button>
        </div>
        <div className="widgets-about" style={{ display: "none" }}>
          <h1 id="about-title">foo</h1>
          <p id="about-content">bar</p>
          <button id="return" className="widget">
            <i className="fa-solid fa-return-arrow"></i>Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalWidgets;
