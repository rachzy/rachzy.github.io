import {startTyper} from "./terminalTyper";

const widgetsContainer = document.querySelector(".widgets");

const displayWidgetsContainer = (): void => {
    widgetsContainer.classList.add("active");
}
displayWidgetsContainer();

const terminal = document.querySelector(".terminal");
const displayTerminal = (): void => {
    terminal.classList.add("active");
    setTimeout((): void => {
        startTyper();
    }, 800);
}
displayTerminal();

const mainText = document.querySelector("#main-text");
const showText = (): void => {
    mainText.classList.add("active");
}
showText();