import "./Title.css";

interface IProps {
  children: string;
  color?: string;
}

const Title: React.FC<IProps> = ({ children, color }) => {
  return (
    <h1 className="title" style={{ color: color }}>
      {children}
    </h1>
  );
};

export default Title;
