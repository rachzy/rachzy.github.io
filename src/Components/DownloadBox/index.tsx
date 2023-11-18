import React, { useState } from "react";
import "./DownloadBox.css";

import { downloadOption } from "../../App";

interface IProps {
  downloadOptions: downloadOption;
  visible: boolean;
}

const DownloadBox: React.FC<IProps> = ({ downloadOptions, visible }) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [currentSelectedOptionID, setCurrentSelectedOptionID] = useState<
    string | null
  >(null);

  function renderDownloadOptions() {
    const downloadSection =
      currentSection === 0 ? downloadOptions : downloadOptions[0].subOptions;
    return downloadSection?.map((option, index) => {
      return (
        <div key={option.id}>
          <input
            type="radio"
            name="resume"
            id={option.id}
            value={option.label}
            onClick={() => {
                setCurrentSelectedOptionID(option.id);
            }}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      );
    });
  }

  function getCurrentSelectedOption() {
    return downloadOptions.find(
      (option) => option.id === currentSelectedOptionID
    );
  }

  function checkSuboptions(): boolean {
    if (!currentSelectedOptionID) return false;
    const currentSelectedOption = getCurrentSelectedOption();
    if (!currentSelectedOption || !currentSelectedOption.subOptions)
      return false;
    return true;
  }

  function renderButtonLabel(): string {
    if(!currentSelectedOptionID) {
        return "Please select...";
    }
    if (checkSuboptions()) {
      return "Proceed >>";
    }
    return "Download";
  }

  function handleButtonClick() {
    const currentSelectedOption = getCurrentSelectedOption();
    if (!currentSelectedOption) return;

    if (currentSelectedOption.downloadFile) {
      return window.open(currentSelectedOption.downloadFile);
    }

    setCurrentSection((currentValue) => currentValue + 1);
    setCurrentSelectedOptionID(null);
  }
  return (
    <div className={`download-options ${visible && "active"}`}>
      <form>{renderDownloadOptions()}</form>
      <button className={currentSelectedOptionID ? "active" : ""} onClick={handleButtonClick}>{renderButtonLabel()}</button>
    </div>
  );
};

export default DownloadBox;
