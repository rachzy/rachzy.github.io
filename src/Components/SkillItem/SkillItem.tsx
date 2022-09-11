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
    <div className="skill-smallbutton" style={{ borderColor: color }}>
      {isHTML ? (
        <div
          style={{ color: color }}
          dangerouslySetInnerHTML={{ __html: innerHTML }}
        ></div>
      ) : (
        <i style={{ color: color }} className={iconClass} />
      )}
      <p style={{ color: color }}>{children}</p>
    </div>
  );
};

export default SkillItem;
