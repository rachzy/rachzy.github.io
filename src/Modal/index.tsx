import React from "react";
import { modal } from "../App";

import "./Modal.css";

interface IProps {
  modal: modal;
  setModal: React.Dispatch<React.SetStateAction<modal>>;
}

const Modal: React.FC<IProps> = ({ modal, setModal }) => {
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
        <div className="modal-description">
          <h1>{modal.title}</h1>
          <p>{modal.description}</p>
          {modal.button && (
            <a href={modal.button.url} target="_blank" rel="noreferrer">
              <button
                style={
                  modal.button.color
                    ? { backgroundColor: modal.button.color, color: "white" }
                    : {}
                }
              >
                {modal.button.title} {""}
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </a>
          )}
        </div>
        {modal.image && (
          <div className="modal-image">
            <img src={require(`../assets/${modal.image}`)} alt={modal.image} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Modal;
