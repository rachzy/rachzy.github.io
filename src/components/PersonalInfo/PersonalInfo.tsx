import Title from "../Title/Title";

import "./PersonalInfo.css";

const PersonalInfo = ({
  pfp,
  description,
}: {
  pfp: { src: string; alt: string; title?: string };
  description: string;
}) => {
  return (
    <div className="personal-info">
      <Title>{"> About Me"}</Title>
      <div className="info-container">
        <img src={pfp.src} alt={pfp.alt} title={pfp.title} />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
