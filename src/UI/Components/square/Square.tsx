import { FC, useContext, useEffect, useMemo, useState } from "react";
import "./Square.css";
import { arrayOfChecker, pawn1 } from "../units/Figure/Figure";
import { arr } from "../ChessDesc/ChessDesc";
import { ProviderContext } from "../../Context/ProviderContext";
import { WhereCanGo } from "../units/WhereCanGo/WhereCanGo";

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
    // modalOpen,
    chengeModalActive,
    arrayCanGo,
    chengeArrayCanGo,
    chengeWinActive,
    chengeDefaultArrayCanGo,
  } = useContext(ProviderContext);

  let color = useMemo(() => {
    if (isEven) {
      return "white";
    }
    return "dark";
  }, [isEven]);

  const canClick = arrayCanGo.find(
    (square) => square[0] === idy && square[1] === idx
  );

  const activeFigure = arrayOfChecker.find(
    (checker) => checker.isActive === true
  );
  if (canClick && activeFigure !== undefined) {
    color = color + " canClick";
  }

  const clickOnFigure = () => {
    const activeFigure = arrayOfChecker.find(
      (checker) => checker.canEatAgain === true
    );

    if (activeFigure !== undefined) {
      const tempCanGo = WhereCanGo(activeFigure.figureId, active);
      if (tempCanGo) {
        chengeArrayCanGo(tempCanGo);
      }
      console.log(tempCanGo);
    } else {
      for (let i = 0; i < arrayOfChecker.length; i++) {
        arrayOfChecker[i].isActive = false;
        if (
          arrayOfChecker[i].positionY === idy &&
          arrayOfChecker[i].positionX === idx
        ) {
          if (
            (((arrayOfChecker[i].figureType === "PawnDark" ||
              arrayOfChecker[i].figureType === "PawnDarkKing") &&
              !active) ||
              ((arrayOfChecker[i].figureType === "PawnWhite" ||
                arrayOfChecker[i].figureType === "PawnWhiteKing") &&
                active)) &&
            activeFigure === undefined
          ) {
            pawn1.activeFigure(arrayOfChecker[i].figureId);

            const tempCanGo = WhereCanGo(arrayOfChecker[i].figureId, active);
            console.log(tempCanGo);

            if (tempCanGo) {
              chengeArrayCanGo(tempCanGo);
            }
          } else {
            chengeModalActive();
            console.log("не твой ход");
          }
        }
      }
    }
    console.log(arrayCanGo);

    // console.log(arrayOfChecker);
  };

  const voidClickHandler = () => {
    // console.log(arrayCanGo);

    // активная пешка
    const activeChecker = arrayOfChecker.find((checker) => checker.isActive);
    // console.log(activeChecker);
    // куда собирается пойти
    const activeSquare = arrayCanGo.find(
      (square) => square[0] === idy && square[1] === idx
    );
    // console.log(activeSquare);

    if (!activeSquare) {
      return;
    }
    // console.log(activeSquare);

    if (
      activeChecker &&
      activeChecker.positionY !== idy &&
      activeChecker.positionX !== idx &&
      activeSquare[0] === idy &&
      activeSquare[1] === idx
    ) {
      // 1 - GO
      if (activeSquare[2] === 1) {
        // console.log(123);

        pawn1.changePosition(activeChecker.figureId, idy, idx);
        chengeActive(true);
        pawn1.activeFigure(activeChecker.figureId);
      }
      // 2 - EAT
      else if (activeSquare[2] === 2) {
        pawn1.eatFigure(activeSquare[3]);
        pawn1.changePosition(activeChecker.figureId, idy, idx);
        pawn1.controlCanCheckerEatAgain();
        // console.log(activeChecker);

        if (activeChecker.canEatAgain === false) {
          // console.log(active);
          chengeActive(true);
        } else {
          // console.log(active);
          chengeActive(false);
        }
        console.log(pawn1.isWin(activeChecker.figureType));
        if (pawn1.isWin(activeChecker.figureType)) {
          chengeWinActive();
          chengeModalActive();
        }
        chengeDefaultArrayCanGo();
      }
      // else if (activeSquare[2] === 4) {
      //   pawn1.eatFigure(activeSquare[3]);
      //   chengeActive(true);
      // }
      // 3 KING - GO
      // console.log(arrayOfChecker);
    }
    // for (let i = 0; i < arrayOfChecker.length; i++) {
    //   if (
    //     !isEven &&
    //     arrayOfChecker[i].positionY !== idy &&
    //     arrayOfChecker[i].positionX !== idx
    //   ) {
    //     const checkerToEat = pawn1.universalControlIsCheckerHere(
    //       arrayOfChecker[i].positionY,
    //       arrayOfChecker[i].positionX,
    //       idy,
    //       idx
    //     );
    //     if (
    //       arrayOfChecker[i].isActive === true &&
    //       arrayOfChecker[i].isKing === false
    //     ) {
    //       if (
    //         arrayOfChecker[i].figureType === "PawnDark" &&
    //         idy > arrayOfChecker[i].positionY &&
    //         idy === arrayOfChecker[i].positionY + 1 &&
    //         (idx === arrayOfChecker[i].positionX + 1 ||
    //           idx === arrayOfChecker[i].positionX - 1)
    //       ) {
    //         if (active === false) {
    //           pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
    //           if (arrayOfChecker[i].canEatAgain === false) {
    //             chengeActive(true);
    //             console.log(arrayOfChecker);

    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           }
    //         } else {
    //           pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           chengeModalActive();
    //         }
    //       } else if (
    //         arrayOfChecker[i].figureType === "PawnWhite" &&
    //         idy === arrayOfChecker[i].positionY - 1 &&
    //         (idx === arrayOfChecker[i].positionX + 1 ||
    //           idx === arrayOfChecker[i].positionX - 1)
    //       ) {
    //         if (active === true) {
    //           pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
    //           if (arrayOfChecker[i].canEatAgain === false) {
    //             chengeActive(true);
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           }
    //         } else {
    //           pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           chengeModalActive();
    //         }
    //       } else if (
    //         arrayOfChecker[i].figureType === "PawnWhite" &&
    //         (idy === arrayOfChecker[i].positionY + 2 ||
    //           idy === arrayOfChecker[i].positionY - 2) &&
    //         (idx === arrayOfChecker[i].positionX + 2 ||
    //           idx === arrayOfChecker[i].positionX - 2)
    //       ) {
    //         if (active === true && arrayOfChecker[i].isActive === true) {
    //           if (checkerToEat === undefined) {
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           } else {
    //             pawn1.eatFigure(checkerToEat);
    //             pawn1.changePosition(arrayOfChecker[i - 1].figureId, idy, idx);
    //             pawn1.controlCanCheckerEatAgain(idy, idx);
    //             if (arrayOfChecker[i - 1].canEatAgain === false) {
    //               chengeActive(true);
    //             } else {
    //               chengeActive(false);
    //             }
    //           }
    //         } else {
    //           pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           chengeModalActive();
    //         }
    //       } else if (
    //         arrayOfChecker[i].figureType === "PawnDark" &&
    //         (idy === arrayOfChecker[i].positionY + 2 ||
    //           idy === arrayOfChecker[i].positionY - 2) &&
    //         (idx === arrayOfChecker[i].positionX + 2 ||
    //           idx === arrayOfChecker[i].positionX - 2)
    //       ) {
    //         if (active === false && arrayOfChecker[i].isActive === true) {
    //           // console.log(arrayOfChecker);
    //           if (checkerToEat === undefined) {
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           } else {
    //             pawn1.eatFigure(checkerToEat);
    //             pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
    //             pawn1.controlCanCheckerEatAgain(idy, idx);
    //             if (arrayOfChecker[i].canEatAgain === false) {
    //               chengeActive(true);
    //             } else {
    //               chengeActive(false);
    //             }
    //             if (arrayOfChecker[0].figureType === "PawnWhite") {
    //               arrayOfChecker[0].figureType = "PawnDark";
    //             }
    //           }
    //         } else {
    //           pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           chengeModalActive();
    //         }
    //       }
    //     } else if (
    //       // черная дамка ест
    //       arrayOfChecker[i].isActive === true &&
    //       arrayOfChecker[i].isKing === true &&
    //       arrayOfChecker[i].figureType === "PawnWhite" &&
    //       checkerToEat !== undefined
    //     ) {
    //       if (
    //         Math.abs(arrayOfChecker[i].positionY - idy) ===
    //         Math.abs(arrayOfChecker[i].positionX - idx)
    //       ) {
    //         if (active === true) {
    //           if (checkerToEat === undefined) {
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           } else {
    //             if (arrayOfChecker[i].canEatAgain === false) {
    //               chengeActive(true);
    //               pawn1.activeFigure(arrayOfChecker[i].figureId);
    //             }
    //             pawn1.eatFigure(checkerToEat);
    //             pawn1.changePosition(arrayOfChecker[i - 1].figureId, idy, idx);
    //             pawn1.controlCanCheckerEatAgain(idy, idx);
    //           }
    //         }
    //       }
    //     } else if (
    //       // черная дамка ест (просто ходит)
    //       arrayOfChecker[i].isActive === true &&
    //       arrayOfChecker[i].isKing === true &&
    //       arrayOfChecker[i].figureType === "PawnDark" &&
    //       checkerToEat !== undefined
    //     ) {
    //       if (
    //         Math.abs(arrayOfChecker[i].positionY - idy) ===
    //         Math.abs(arrayOfChecker[i].positionX - idx)
    //       ) {
    //         if (active === false) {
    //           console.log(checkerToEat);
    //           if (checkerToEat === undefined) {
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           } else {
    //             if (arrayOfChecker[i].canEatAgain === false) {
    //               chengeActive(true);
    //               pawn1.activeFigure(arrayOfChecker[i].figureId);
    //             }
    //             pawn1.eatFigure(checkerToEat);
    //             pawn1.changePosition(arrayOfChecker[i - 1].figureId, idy, idx);
    //             pawn1.controlCanCheckerEatAgain(idy, idx);
    //             if (arrayOfChecker[0].figureType === "PawnWhite") {
    //               arrayOfChecker[0].figureType = "PawnDark";
    //             }
    //           }
    //         }
    //       }
    //     } else if (
    //       // дамки:
    //       // черная дамка (просто ходит)
    //       arrayOfChecker[i].isActive === true &&
    //       arrayOfChecker[i].figureType === "PawnDark" &&
    //       arrayOfChecker[i].isKing === true
    //     ) {
    //       if (
    //         Math.abs(arrayOfChecker[i].positionY - idy) ===
    //         Math.abs(arrayOfChecker[i].positionX - idx)
    //       ) {
    //         if (active === false) {
    //           pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
    //           if (arrayOfChecker[i].canEatAgain === false) {
    //             chengeActive(true);
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           }
    //         } else {
    //           pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           chengeModalActive();
    //         }
    //       }
    //     } else if (
    //       // будая дамка (просто ходит)
    //       arrayOfChecker[i].isActive === true &&
    //       arrayOfChecker[i].isKing === true &&
    //       arrayOfChecker[i].figureType === "PawnWhite" &&
    //       checkerToEat === undefined
    //     ) {
    //       if (
    //         Math.abs(arrayOfChecker[i].positionY - idy) ===
    //         Math.abs(arrayOfChecker[i].positionX - idx)
    //       ) {
    //         if (active === true) {
    //           pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
    //           if (arrayOfChecker[i].canEatAgain === false) {
    //             chengeActive(true);
    //             pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           }
    //         } else {
    //           pawn1.activeFigure(arrayOfChecker[i].figureId);
    //           chengeModalActive();
    //         }
    //       }
    //     }
    //   }
    // }
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
