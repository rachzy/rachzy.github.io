import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-content">
      <p className="contact-desc">You can reach me on:</p>
      <div className="contact-methods">
        <div className="contact-box email">
          <i className="fa-solid fa-envelope"></i> &nbsp;
          <p>
            <a
              href="malto:henriqueferreira.fox@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              henriqueferreira.fox@gmail.com
            </a>
          </p>
        </div>
        <div className="contact-box linkedin">
          <i className="fa-brands fa-linkedin"></i> &nbsp;
          <p>
            <a
              href="https://www.linkedin.com/in/henriqueferreiradeveloper"
              target="_blank"
              rel="noreferrer"
            >
              Henrique Ferreira
            </a>
          </p>
        </div>
        <div className="contact-box discord">
          <i className="fa-brands fa-discord"></i> &nbsp;
          <p>
            <a
              href="https://discord.com/users/392839201034338316"
              target="_blank"
              rel="noreferrer"
            >
              rachzy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
