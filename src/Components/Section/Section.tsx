import "./Section.css";

interface IProps {
  id?: string;
  title: string;
  column?: boolean;
  center?: boolean;
  children: React.ReactNode;
}

const Section: React.FC<IProps> = ({ id, title, column, center, children }) => {
  return (
    <section id={id}>
      <h1 className="section-title">{title}</h1>
      <div
        className={`section-content ${center && "center"}`}
        style={
          column
            ? { flexDirection: "column", width: "100%", flexWrap: "nowrap" }
            : {}
        }
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
