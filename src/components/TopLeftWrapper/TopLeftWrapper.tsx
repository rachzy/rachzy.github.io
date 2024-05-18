import "./TopLeftWrapper.css";

interface IProps {
  id?: string;
  children: React.ReactNode;
}

const TopLeftWrapper: React.FC<IProps> = ({ id, children }) => {
  return (
    <div id={id} className="top-left-wrapper">
      {children}
    </div>
  );
};

export default TopLeftWrapper;
