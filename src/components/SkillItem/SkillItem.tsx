import "./SkillItem.css";

interface IProps {
  iconClass: string;
  color: string;
  isHTML: boolean;
  innerHTML: string;
  children: string;
}

const SkillItem: React.FC<IProps> = ({
  isHTML,
  color,
  iconClass,
  innerHTML,
  children,
}) => {
  return (
    <div
      className="skill-smallbutton"
      style={{ borderColor: color, boxShadow: `3px 1px 1vw ${color}` }}
    >
      {isHTML ? (
        <div
          style={{ color: color }}
          dangerouslySetInnerHTML={{ __html: innerHTML }}
        ></div>
      ) : (
        <i style={{ color: color }} className={iconClass} />
      )}
      <p style={{ color: color, cursor: "default" }}>
        <strong>{children}</strong>
      </p>
    </div>
  );
};

export default SkillItem;
