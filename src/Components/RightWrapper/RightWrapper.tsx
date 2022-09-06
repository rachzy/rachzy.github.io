import "./RightWrapper.css";

interface IProps {
  id?: string;
  children: React.ReactNode;
}

const RightWrapper: React.FC<IProps> = ({ id, children }) => {
  return (
    <div id={id} className="right-wrapper">
      {children}
    </div>
  );
};

export default RightWrapper;
