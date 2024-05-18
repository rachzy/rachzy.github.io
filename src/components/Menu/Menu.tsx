import { MutableRefObject, useEffect, useRef, useState } from "react";
import Title from "../Title/Title";
import "./Menu.css";

const Menu = () => {
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

  const navMenu = useRef() as MutableRefObject<HTMLMenuElement>;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollY } = window;
      setCurrentScrollPosition(scrollY);
    });
  }, []);

  useEffect(() => {
    if (currentScrollPosition < 100) {
      return navMenu.current.classList.remove("solid");
    }
    navMenu.current.classList.add("solid");
  }, [currentScrollPosition]);
  return (
    <nav ref={navMenu} className="menu" id="nav-menu">
      <Title>Rachzy</Title>
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
          <a href="https://www.instagram.com/phenrique.ferreira1001/">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
