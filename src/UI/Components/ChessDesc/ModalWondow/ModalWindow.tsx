import React, { useContext } from "react";
import { ProviderContext } from "../../../Context/ProviderContext";
import "./ModalWindow.css";

export const ModalWindow = () => {
  const { modalOpen, chengeModalActive, winOpen, chengeWinActive } = useContext(ProviderContext);

  const modalSwitchHandler = () => {
    if (modalOpen) {
      chengeModalActive();
    }
    if (winOpen) {
      chengeWinActive()
    }
  };

  return (
    <div className={`${modalOpen ? "modal open" : "modal"}`}>
      <div className="modalWindow">
        <h1> {`${(winOpen && "WIN" ) || (modalOpen && "не твой ход") }`}</h1>
        <button className="modalButton" onClick={modalSwitchHandler}>
          close
        </button>
      </div>
    </div>
  );
};