import React from "react";
import { modal } from "../App";

import "./Modal.css";

interface IProps {
  modal: modal;
  setModal: React.Dispatch<React.SetStateAction<modal>>;
}

const Modal: React.FC<IProps> = ({ modal, setModal }) => {
  const renderButtons = (): JSX.Element[] | null => {
    if (!modal.buttons) return null;
    return modal.buttons.map((button) => {
      return (
        <a
          key={button.title}
          href={button.url}
          target="_blank"
          rel="noreferrer"
        >
          <button
            style={
              button.color
                ? { backgroundColor: button.color, color: "white" }
                : {}
            }
          >
            {button.title} {""}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
        </a>
      );
    });
  };
  return (
    <main className={`modal-container ${modal.enabled && "active"}`}>
      <button
        className="close-modal"
        onClick={() => {
          setModal((currentModal) => {
            return { ...currentModal, enabled: false };
          });
        }}
      >
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
      <div className="modal-content">
        <div className="modal-wrapper description">
          <h1>{modal.title}</h1>
          <p>{modal.description}</p>
          <div className="buttons-wrapper">{renderButtons()}</div>
        </div>
        {modal.image && (
          <div className="modal-wrapper image">
            <img src={require(`../assets/${modal.image}`)} alt={modal.image} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Modal;
