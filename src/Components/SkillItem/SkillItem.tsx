interface IProps {
  iconClass: string;
  isHTML: boolean;
  innerHTML: string;
  children: string;
}

const SkillItem: React.FC<IProps> = ({
  isHTML,
  iconClass,
  innerHTML,
  children,
}) => {
  return (
    <div className="skill-smallbutton">
      {isHTML ? (
        <div dangerouslySetInnerHTML={{ __html: innerHTML }}></div>
      ) : (
        <i className={iconClass} />
      )}
      <p>{children}</p>
    </div>
  );
};

export default SkillItem;
