import { FC, useContext, useMemo } from "react";
import "./Square.css";
import { arrayOfChecker, pawn1 } from "../units/Figure/Figure";
import { arr } from "../ChessDesc/ChessDesc";
import { ProviderContext } from "../../Context/ProviderContext";

interface SquareProps {
  figureType?: string;
  isEven: boolean;
  idx: number;
  idy: number;
}

export const Square: FC<SquareProps> = ({ isEven, figureType, idy, idx }) => {
  const {
    active,
    chengeActive,
    modalOpen,
    chengeModalActive,
    additionalMove,
    chengeAdditionalMove,
  } = useContext(ProviderContext);

  const color = useMemo(() => {
    if (isEven) {
      return "white";
    }
    return "dark";
  }, [isEven]);

  const clickOnFigure = () => {
    for (let i = 0; i < arrayOfChecker.length; i++) {
      arrayOfChecker[i].isActive = false;
      if (
        arrayOfChecker[i].positionY === idy &&
        arrayOfChecker[i].positionX === idx
      ) {
        pawn1.activeFigure(arrayOfChecker[i].figureId);
      }
    }
  };

  const voidClickHandler = () => {
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (
        !isEven &&
        arrayOfChecker[i].positionY !== idy &&
        arrayOfChecker[i].positionX !== idx
      ) {
        const checkerToEat = pawn1.universalControlIsCheckerHere(
          arrayOfChecker[i].positionY,
          arrayOfChecker[i].positionX,
          idy,
          idx
        );
        if (
          arrayOfChecker[i].isActive === true &&
          arrayOfChecker[i].isKing === false
        ) {
          if (
            arrayOfChecker[i].figureType === "PawnDark" &&
            idy > arrayOfChecker[i].positionY &&
            idy === arrayOfChecker[i].positionY + 1 &&
            (idx === arrayOfChecker[i].positionX + 1 ||
              idx === arrayOfChecker[i].positionX - 1)
          ) {
            if (active === false) {
              pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
              if (arrayOfChecker[i].canEatAgain === false) {
                chengeActive(true);
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              }
            } else {
              pawn1.activeFigure(arrayOfChecker[i].figureId);
              chengeModalActive();
            }
          } else if (
            arrayOfChecker[i].figureType === "PawnWhite" &&
            idy === arrayOfChecker[i].positionY - 1 &&
            (idx === arrayOfChecker[i].positionX + 1 ||
              idx === arrayOfChecker[i].positionX - 1)
          ) {
            if (active === true) {
              pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
              if (arrayOfChecker[i].canEatAgain === false) {
                chengeActive(true);
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              }
            } else {
              pawn1.activeFigure(arrayOfChecker[i].figureId);
              chengeModalActive();
            }
          } else if (
            arrayOfChecker[i].figureType === "PawnWhite" &&
            (idy === arrayOfChecker[i].positionY + 2 ||
              idy === arrayOfChecker[i].positionY - 2) &&
            (idx === arrayOfChecker[i].positionX + 2 ||
              idx === arrayOfChecker[i].positionX - 2)
          ) {
            if (active === true && arrayOfChecker[i].isActive === true) {
              if (checkerToEat === undefined) {
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              } else {
                pawn1.eatFigure(checkerToEat);
                pawn1.changePosition(arrayOfChecker[i - 1].figureId, idy, idx);
                pawn1.controlCanCheckerEatAgain(idy, idx);
                if (arrayOfChecker[i - 1].canEatAgain === false) {
                  chengeActive(true);
                } else {
                  chengeActive(false);
                }
              }
            } else {
              pawn1.activeFigure(arrayOfChecker[i].figureId);
              chengeModalActive();
            }
          } else if (
            arrayOfChecker[i].figureType === "PawnDark" &&
            (idy === arrayOfChecker[i].positionY + 2 ||
              idy === arrayOfChecker[i].positionY - 2) &&
            (idx === arrayOfChecker[i].positionX + 2 ||
              idx === arrayOfChecker[i].positionX - 2)
          ) {
            if (active === false && arrayOfChecker[i].isActive === true) {
              // console.log(arrayOfChecker);
              if (checkerToEat === undefined) {
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              } else {
                pawn1.eatFigure(checkerToEat);
                pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
                pawn1.controlCanCheckerEatAgain(idy, idx);
                if (arrayOfChecker[i].canEatAgain === false) {
                  chengeActive(true);
                } else {
                  chengeActive(false);
                }
                if (arrayOfChecker[0].figureType === "PawnWhite") {
                  arrayOfChecker[0].figureType = "PawnDark";
                }
              }
            } else {
              pawn1.activeFigure(arrayOfChecker[i].figureId);
              chengeModalActive();
            }
          }
        } else if (
          // черная дамка ест (просто ходит)
          arrayOfChecker[i].isActive === true &&
          arrayOfChecker[i].isKing === true &&
          arrayOfChecker[i].figureType === "PawnWhite" &&
          checkerToEat !== undefined
        ) {
          if (
            Math.abs(arrayOfChecker[i].positionY - idy) ===
            Math.abs(arrayOfChecker[i].positionX - idx)
          ) {
            if (active === true) {
              if (checkerToEat === undefined) {
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              } else {
                if (arrayOfChecker[i].canEatAgain === false) {
                  chengeActive(true);
                  pawn1.activeFigure(arrayOfChecker[i].figureId);
                }
                pawn1.eatFigure(checkerToEat);
                pawn1.changePosition(arrayOfChecker[i - 1].figureId, idy, idx);
                pawn1.controlCanCheckerEatAgain(idy, idx);
              }
            }
          }
        } else if (
          // черная дамка ест (просто ходит)
          arrayOfChecker[i].isActive === true &&
          arrayOfChecker[i].isKing === true &&
          arrayOfChecker[i].figureType === "PawnDark" &&
          checkerToEat !== undefined
        ) {
          if (
            Math.abs(arrayOfChecker[i].positionY - idy) ===
            Math.abs(arrayOfChecker[i].positionX - idx)
          ) {
            if (active === false) {
              console.log(checkerToEat);
              if (checkerToEat === undefined) {
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              } else {
                if (arrayOfChecker[i].canEatAgain === false) {
                  chengeActive(true);
                  pawn1.activeFigure(arrayOfChecker[i].figureId);
                }
                pawn1.eatFigure(checkerToEat);
                pawn1.changePosition(arrayOfChecker[i - 1].figureId, idy, idx);
                pawn1.controlCanCheckerEatAgain(idy, idx);
                if (arrayOfChecker[0].figureType === "PawnWhite") {
                  arrayOfChecker[0].figureType = "PawnDark";
                }
              }
            }
          }
        } else if (
          // дамки:
          // черная дамка (просто ходит)
          arrayOfChecker[i].isActive === true &&
          arrayOfChecker[i].figureType === "PawnDark" &&
          arrayOfChecker[i].isKing === true
        ) {
          if (
            Math.abs(arrayOfChecker[i].positionY - idy) ===
            Math.abs(arrayOfChecker[i].positionX - idx)
          ) {
            if (active === false) {
              pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
              if (arrayOfChecker[i].canEatAgain === false) {
                chengeActive(true);
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              }
            } else {
              pawn1.activeFigure(arrayOfChecker[i].figureId);
              chengeModalActive();
            }
          }
        } else if (
          // будая дамка (просто ходит)
          arrayOfChecker[i].isActive === true &&
          arrayOfChecker[i].isKing === true &&
          arrayOfChecker[i].figureType === "PawnWhite" &&
          checkerToEat === undefined
        ) {
          if (
            Math.abs(arrayOfChecker[i].positionY - idy) ===
            Math.abs(arrayOfChecker[i].positionX - idx)
          ) {
            if (active === true) {
              pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
              if (arrayOfChecker[i].canEatAgain === false) {
                chengeActive(true);
                pawn1.activeFigure(arrayOfChecker[i].figureId);
              }
            } else {
              pawn1.activeFigure(arrayOfChecker[i].figureId);
              chengeModalActive();
            }
          }
        }
      }
    }
  };

  return (
    <>
      <div onClick={voidClickHandler} className={`${color} size`}>
        {arr[idy][idx] && (
          <div onClick={clickOnFigure} className={`${arr[idy][idx]}`} />
        )}
      </div>
    </>
  );
};
