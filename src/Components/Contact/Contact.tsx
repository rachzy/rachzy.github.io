import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-content">
      <p className="contact-desc">
        If you'd like to contact me for some reason, there are many ways to do
        it! You can do it by sending me an email and I'll try to reply soon as
        possible, but if you want to contact me directly and quickly, you can
        text me in Discord, I'm online there most of the time.
      </p>
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
              href="https://www.linkedin.com/in/henrique-ferreira-638304239/"
              target="_blank"
              rel="noreferrer"
            >
              Henrique Ferreira
            </a>
          </p>
        </div>
        <div className="contact-box discord">
          <i className="fa-brands fa-discord"></i> &nbsp;
          <p>rach#7705</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
