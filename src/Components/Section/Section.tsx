import "./Section.css";

interface IProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<IProps> = ({ id, title, children }) => {
  return (
    <section id={id}>
      <h1 className="section-title">{title}</h1>
      <div className="section-content">{children}</div>
    </section>
  );
};

export default Section;
