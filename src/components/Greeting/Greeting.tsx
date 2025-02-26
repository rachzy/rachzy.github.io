import { useState } from "react";
import Button from "../Button/Button";
import DownloadBox from "../DownloadBox";

import "./Greeting.css";

import downloadOptions from "../../data/downloadOptions.json";

const Greeting = () => {
  const [resumeOptionsVisible, setResumeOptionsVisible] = useState(false);
  return (
    <div className="greeting-container">
      <div className="greeting">
        <p>👋 Hello World, I'm</p>
        <h1>Henrique</h1>
        <h2>Software Developer</h2>
        <Button
          onClick={() =>
            setResumeOptionsVisible((currentValue) => !currentValue)
          }
        >
          <i className="fa-solid fa-download"></i> My Resume
        </Button>
        <DownloadBox
          downloadOptions={downloadOptions}
          visible={resumeOptionsVisible}
          setVisible={setResumeOptionsVisible}
        />
      </div>
    </div>
  );
};

export default Greeting;
