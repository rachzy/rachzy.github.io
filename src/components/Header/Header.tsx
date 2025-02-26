import { MutableRefObject, useEffect, useRef, useState } from "react";
import Title from "../Title/Title";
import "./Header.css";

const Header = () => {
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

  const menuRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollY } = window;
      setCurrentScrollPosition(scrollY);
    });
  }, []);

  useEffect(() => {
    if (currentScrollPosition < 100) {
      return menuRef.current.classList.remove("solid");
    }
    menuRef.current.classList.add("solid");
  }, [currentScrollPosition]);
  return (
    <header ref={menuRef} className="menu" id="nav-menu">
      <div className="content">
        <div>
          <Title>Rachzy</Title>
          <nav>
            <ul className="navigator">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <nav>
            <ul className="social-media">
              <li>
                <a href="https://github.com/rachzy">
                  <i className="fa-brands fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/henrique-ferreira-638304239/">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/rachenrique/">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
