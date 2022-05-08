import { startTyper } from "./terminalTyper.js";
const widgetsContainer = document.querySelector(".widgets");
const displayWidgetsContainer = () => {
    widgetsContainer.classList.add("active");
};
displayWidgetsContainer();
const terminal = document.querySelector(".terminal");
const displayTerminal = () => {
    terminal.classList.add("active");
    setTimeout(() => {
        startTyper();
    }, 800);
};
displayTerminal();
const mainText = document.querySelector("#main-text");
const showText = () => {
    mainText.classList.add("active");
};
showText();
