import React, { useState } from "react";
import "./DownloadBox.css";
import { IDownloadOption } from "../../interfaces/downloadOption";

interface IProps {
  downloadOptions: IDownloadOption[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownloadBox: React.FC<IProps> = ({ downloadOptions, visible, setVisible }) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [currentSelectedOptionID, setCurrentSelectedOptionID] = useState<
    string | null
  >(null);

  function renderDownloadOptions() {
    const downloadSection =
      currentSection === 0 ? downloadOptions : downloadOptions[0].subOptions;
    return downloadSection?.map((option) => {
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
    if (currentSection === 0) {
      return downloadOptions.find(
        (option) => option.id === currentSelectedOptionID
      );
    }

    return downloadOptions[0].subOptions?.find(
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

  function handleButtonClick() {
    const currentSelectedOption = getCurrentSelectedOption();
    if (!currentSelectedOption) return;

    if (currentSelectedOption.downloadFile) {
        setVisible(false);
        setCurrentSection(0);
        return setCurrentSelectedOptionID(null);;
    }

    setCurrentSection((currentValue) => currentValue + 1);
    setCurrentSelectedOptionID(null);
  }

  function renderButton(): JSX.Element {
    const selectedOption = getCurrentSelectedOption();
    if (!selectedOption || !currentSelectedOptionID) {
      return <button onClick={handleButtonClick}>Please select...</button>;
    }

    if (checkSuboptions()) {
      return (
        <button className="active" onClick={handleButtonClick}>
          Proceed {">>"}
        </button>
      );
    }

    return (
      <a
        href={require(`../../assets/${selectedOption.downloadFile}`)}
        download={`${selectedOption.id}.pdf`}
        target={"_blank"}
        rel="noreferrer"
      >
        <button className="active" onClick={handleButtonClick}>
          Download
        </button>
      </a>
    );
  }

  return (
    <div className={`download-options ${visible && "active"}`}>
      <form>{renderDownloadOptions()}</form>
      {renderButton()}
    </div>
  );
};

export default DownloadBox;
