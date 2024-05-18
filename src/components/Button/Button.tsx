import "./Button.css";

interface IProps {
    name?: string;
    id?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<IProps> = ({name, id, onClick, children}) => {
    return(
        <button name={name} className="default-btn" id={id} onClick={onClick}>{children}</button>    
    )
}

export default Button;