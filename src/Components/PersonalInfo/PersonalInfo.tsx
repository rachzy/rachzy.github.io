import Title from "../Title/Title";

import "./PersonalInfo.css";

const PersonalInfo = () => {
  return (
    <div className="personal-info">
      <Title>{"> About Me"}</Title>
      <div className="info-container">
        <img src={require("../../assets/fox.jpg")} alt="my-pfp" title="I love artic foxes" />
        <p>
          Hey what's up? I'm Henrique, AKA rachzy. I'm a Web Developer and
          future Software Engineer. I have experience on building web
          applications and REST APIs. I'm really into technology and really like
          learning new things. Currently, I'm not looking for jobs, but I'm open
          for new experiences.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;