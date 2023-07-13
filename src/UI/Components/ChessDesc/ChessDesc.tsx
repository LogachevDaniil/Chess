import { Square } from "../square/Square";
import { Card } from "./card/Card";
import { Card1 } from "./card1/Card";
import "./ChessDesc.css";
import { arrayOfChecker } from "../units/Figure/Figure";
import { useContext, useEffect } from "react";
import { ProviderContext } from "../../Context/ProviderContext";
import { TitleWhoseTurn } from "./TitleWhoseTurn/TitleWhoseTurn";
import { ModalWindow } from "./ModalWondow/ModalWindow";
export const arr: string[][] = Array.from(Array(8), () =>
  new Array(8).fill("")
);

export const ChessDesc = () => {
  const { arrayOfSquares, nextTurn } = useContext(ProviderContext);

  (() => {
    for (let i = 0; i < arr.length; i++) {
      for (let y = 0; y < arr[i].length; y++) {
        arr[i][y] = "";
      }
    }
    for (let i = 0; i < arrayOfChecker.length; i++) {
      arr[arrayOfChecker[i].positionY][arrayOfChecker[i].positionX] =
        arrayOfChecker[i].figureType;

      if (arrayOfChecker[i].isKing === true) {
        arr[arrayOfChecker[i].positionY][arrayOfChecker[i].positionX] =
          arr[arrayOfChecker[i].positionY][arrayOfChecker[i].positionX] +
          " King";
      }
    }
  })();
  // console.log(arrayOfSquares);
  useEffect(() => {}, [nextTurn]);

  return (
    <div className="game">
      <TitleWhoseTurn />
      <ModalWindow />
      <div className="ChessDesc">
        {arr.map((_, idy) =>
          arr[idy].map((_, idx) => (
            <Square
              isEven={
                (idy % 2 === 0 && idx % 2 === 0) ||
                (idy % 2 !== 0 && idx % 2 !== 0)
              }
              figureType={arr[idy][idx]}
              idy={idy}
              idx={idx}
            />
          ))
        )}
      </div>
      <Card />
      <Card1 />
    </div>
  );
};
