import "./BottomRightWrapper.css";

interface IProps {
  id?: string;
  children: React.ReactNode;
}

const BottomRightWrapper: React.FC<IProps> = ({ id, children }) => {
  return <div id={id} className="bottom-right-wrapper">{children}</div>;
};

export default BottomRightWrapper;
