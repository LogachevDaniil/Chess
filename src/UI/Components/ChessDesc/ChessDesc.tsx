import { Square } from "../square/Square";
import "./ChessDesc.css";
import { arrayOfChecker } from "../units/Figure/Figure";
import { useContext } from "react";
import { ProviderContext } from "../../Context/ProviderContext";
import { TitleWhoseTurn } from "./TitleWhoseTurn/TitleWhoseTurn";
import { ModalWindow } from "./ModalWondow/ModalWindow";
export const arr: string[][] = Array.from(Array(8), () =>
  new Array(8).fill("")
);

export const ChessDesc = () => {
  const { arrayOfSquares } = useContext(ProviderContext);

  const figureInArray = () => {
    for (let i = 0; i < arr.length; i++) {
      for (let y = 0; y < arr[i].length; y++) {
        arr[i][y] = "";
      }
    }
    for (let i = 0; i < arrayOfChecker.length; i++) {
      arr[arrayOfChecker[i].positionY][arrayOfChecker[i].positionX] =
        arrayOfChecker[i].figureType;
    }
  };
  figureInArray();

  // const chengeActivse = () => {
  //   chengeActive();
  //   console.log("chenge active " + active);
  // };

  // setArrayState(arr)
  // onClick={chengeActivse}
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
    </div>
  );
};
