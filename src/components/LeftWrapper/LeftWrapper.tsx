import "./LeftWrapper.css";

interface IProps {
  id?: string;
  children: React.ReactNode;
}

const LeftWrapper: React.FC<IProps> = ({ id, children }) => {
  return <div id={id} className="left-wrapper">{children}</div>;
};

export default LeftWrapper;
