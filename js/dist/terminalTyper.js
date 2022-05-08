//Terminal Typer - by rachzy
const commandLine = document.querySelector("#command-line");
const outputLine = document.querySelector("#output-line");
let text = 'console.log("I love coding");'; //The text that will be written in the command line
let output = "I love coding";
const setOutput = () => {
    setTimeout(() => {
        outputLine.textContent = `>${output}`;
    }, 1000);
};
let currentTextValue = ">";
let currentArrPlace = 0;
const textSplit = text.split("");
export const startTyper = () => {
    const typer = setInterval(() => {
        currentTextValue = `${currentTextValue}${textSplit[currentArrPlace]}`;
        commandLine.textContent = currentTextValue;
        if (currentArrPlace === textSplit.length - 1) {
            clearInterval(typer);
            return setOutput();
        }
        currentArrPlace++;
    }, 100);
};
