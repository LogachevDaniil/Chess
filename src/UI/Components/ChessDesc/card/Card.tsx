import React from "react";
import "./Card.css";
export const Card = () => {
  return (
    <div>
      <div className="wrap">
        <div className="card">
          <div className="front">
            <span>наведи на меня курсор)</span>
          </div>
          <div className="back">
            <span>
              мне будо интересно как работают transition и transform в css
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
