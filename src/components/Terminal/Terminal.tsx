import { useEffect, useState } from "react";
import "./Terminal.css";

const Terminal = ({ input, output }: { input: string; output: string }) => {
  const [commandLineText, setCommandLineText] = useState("");
  const [outputLineText, setOutputLineText] = useState("");

  const commandLineValue = `console.log("${input}");`;
  const outputLineValue = `> ${output}`;

  useEffect(() => {
    if (commandLineText.length >= commandLineValue.length) {
      setTimeout(() => {
        setOutputLineText(outputLineValue);
      }, 1000);
      return;
    }

    let nextLetter = commandLineValue.split("")[commandLineText.length];
    setTimeout(() => {
      setCommandLineText((currentValue) => `${currentValue}${nextLetter}`);
    }, 100);
  }, [commandLineText]);
  return (
    <div className="terminal-container">
      <div className="terminal">
        <div className="fakeMenu">
          <div className="fakeButtons fakeClose"></div>
          <div className="fakeButtons fakeMinimize"></div>
          <div className="fakeButtons fakeZoom"></div>
        </div>
        <div className="fakeScreen">
          <p id="command-line">{commandLineText}</p>
          <p id="output-line">{outputLineText}</p>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
