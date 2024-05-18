import React from "react";

import "./Modal.css";
import { IModal } from "../interfaces/modal";

interface IProps {
  modal: IModal;
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
}

const Modal: React.FC<IProps> = ({ modal, setModal }) => {
  function renderButtons(): JSX.Element[] | null {
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

  function renderTags(): JSX.Element[] | null {
    if(!modal.tags) return null;
    return modal.tags?.map((tag) => {
      return <span key={tag}>{tag}</span>;
    });
  }
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
          <div className="modal-tags">
          {renderTags()}
        </div>
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
