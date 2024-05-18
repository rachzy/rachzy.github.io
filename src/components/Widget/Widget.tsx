import "./Widget.css";

interface IProps {
  id?: string;
  iconClass?: string;
  onClick: () => void;
  children: string;
}

const Widget: React.FC<IProps> = ({ id, iconClass, onClick, children }) => {
  return (
    <button id={id} onClick={onClick} className="widget">
      <i className={iconClass} /> {children}
    </button>
  );
};

export default Widget;
