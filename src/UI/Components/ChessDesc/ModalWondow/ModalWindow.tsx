import React, { useContext } from "react";
import { ProviderContext } from "../../../Context/ProviderContext";
import "./ModalWindow.css";

export const ModalWindow = () => {
  const { modalOpen, chengeModalActive } = useContext(ProviderContext);

  const modalSwitchHandler = () => {
    chengeModalActive();
  };

  return (
    <div className={`${modalOpen ? "modal open" : "modal"}`}>
      <div className="modalWindow">
        <h1>не твой ход</h1>
        <button className="modalButton" onClick={modalSwitchHandler}>
          close
        </button>
      </div>
    </div>
  );
};