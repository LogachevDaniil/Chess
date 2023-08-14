import React, { useContext, useEffect, useMemo } from "react";
import "./TitleWhoseTurn.css";
import { ProviderContext } from "../../../Context/ProviderContext";
export const TitleWhoseTurn = () => {
  const { active } = useContext(ProviderContext);

  // useMemo(() => {
  //   const activeModal = active;
  // }, [active]);

  // useEffect(() => {}, [active]);
  return (
    <div className="TitleWhoseTurn">
      {active ? "Xодят белые" : "Xодят черные"}
    </div>
  );
};
