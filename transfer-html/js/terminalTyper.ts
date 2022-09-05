//Terminal Typer - by rachzy


const terminal = document.querySelector(".terminal");
const commandLine = document.querySelector("#command-line") as HTMLParagraphElement;
const outputLine = document.querySelector("#output-line") as HTMLParagraphElement;

let text = 'console.log("I love coding");'; //The text that will be written in the command line
let output = "I love coding";

const setOutput = (): void => {
  setTimeout((): void => {
    outputLine.textContent = `>${output}`;
  }, 1000);
};

let currentTextValue = ">";
let currentArrPlace = 0;
const textSplit = text.split("");

const startTyper = (): void => {
  const typer = setInterval((): void => {
    currentTextValue = `${currentTextValue}${textSplit[currentArrPlace]}`;
    commandLine.textContent = currentTextValue;

    if (currentArrPlace === textSplit.length - 1) {
      clearInterval(typer);
      return setOutput();
    }
    currentArrPlace++;
  }, 100);
};

setTimeout(() => {
  startTyper();
}, 200);
