import "./Header.css";

interface IProps {
  id?: string;
  children: React.ReactNode;
}

const Header: React.FC<IProps> = ({ id, children }) => {
  return <header id={id}>{children}</header>;
};

export default Header;
