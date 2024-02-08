import Title from "../Title/Title";

import "./PersonalInfo.css";

const PersonalInfo = () => {
  return (
    <div className="personal-info">
      <Title>{"> About Me"}</Title>
      <div className="info-container">
        <img
          src={require("../../assets/fox.jpg")}
          alt="my-pfp"
          title="I love artic foxes"
        />
        <p>
          Hi! I'm Henrique, AKA rachzy, and I'm a Software Developer.
          I have experience on building web applications, mobile applications,
          minecraft plugins and REST APIs. I'm really into technology,
          entrepeneurship and really like learning new things. I'm
          currently looking for jobs, so feel free to reach me!
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
