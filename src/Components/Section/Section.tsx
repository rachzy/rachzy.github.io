import "./Section.css";

interface IProps {
  id?: string;
  title: string;
  column?: boolean;
  children: React.ReactNode;
}

const Section: React.FC<IProps> = ({ id, title, column, children }) => {
  return (
    <section id={id}>
      <h1 className="section-title">{title}</h1>
      <div className="section-content" style={column ? {flexDirection: "column", width: "100%"} : {}}>{children}</div>
    </section>
  );
};

export default Section;
