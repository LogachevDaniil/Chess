import React, { useContext } from "react";
import "./TitleWhoseTurn.css";
import { ProviderContext } from "../../../Context/ProviderContext";
export const TitleWhoseTurn = () => {
  const { active } = useContext(ProviderContext);
  return (
    <div className="TitleWhoseTurn">
      {active ? "Xодят белые" : "Xодят черные"}
    </div>
  );
};
