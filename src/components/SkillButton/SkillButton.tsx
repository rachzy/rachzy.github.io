import "./SkillButton.css";

interface IProps {
  onClick: () => void;
  iconClass: string;
  children: string;
}

const SkillButton: React.FC<IProps> = ({ onClick, iconClass, children }) => {
  return (
    <div onClick={onClick} className="skill-button">
      <i className={iconClass} />
      <p>{children}</p>
    </div>
  );
};

export default SkillButton;
