// import React from "react";
import { Pawn, arrayOfChecker, pawn1 } from "../Figure/Figure";
import { arr } from "../../ChessDesc/ChessDesc";
import { findCanGoKing } from "./WhereCanGoKing";

export const WhereCanGo = (figureId: number, active: boolean) => {
  const activeChecker: Pawn | undefined = arrayOfChecker.find(
    (checker) => checker.figureId === figureId
  );

  if (!activeChecker) return;

  const checkerCanGo = () => {
    const canGo = [];
    if (!activeChecker.isKing) {
      for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
          if (
            !arrayOfChecker.find(
              (checker) => checker.positionY === y && checker.positionX === x
            )
          ) {
            // обычные пешки ходят
            if (
              ((activeChecker.figureType === "PawnDark" &&
                y === activeChecker.positionY + 1) ||
                (activeChecker.figureType === "PawnWhite" &&
                  y === activeChecker.positionY - 1)) &&
              (x === activeChecker.positionX + 1 ||
                x === activeChecker.positionX - 1)
            ) {
              canGo.push([y, x, 1, -1]);
            }
            // console.log(y, x);

            let checkerToEatId = pawn1.universalControlIsCheckerHere(
              activeChecker.positionY,
              activeChecker.positionX,
              y,
              x
            );
            console.log(checkerToEatId);

            // обычные пешки едят
            if (
              (y === activeChecker.positionY + 2 ||
                y === activeChecker.positionY - 2) &&
              (x === activeChecker.positionX + 2 ||
                x === activeChecker.positionX - 2) &&
              checkerToEatId !== undefined
            ) {
              canGo.push([y, x, 2, checkerToEatId]);
            }
          }
        }
      }
    }
    if (activeChecker.isKing) {
      //  правый нижний
      for (
        let y = activeChecker.positionY, numberOfenemises = 0;
        y <= 7 && numberOfenemises < 2;
        y++
      ) {
        for (let x = activeChecker.positionX; x <= 7; x++) {
          let checkerToEatId = pawn1.universalControlIsCheckerHere(
            activeChecker.positionY,
            activeChecker.positionX,
            y,
            x
          );
          let canGoReturn = findCanGoKing(
            checkerToEatId,
            numberOfenemises,
            activeChecker,
            arrayOfChecker,
            y,
            x
          );
          if (canGoReturn) {
            numberOfenemises = canGoReturn[4];
            if (canGoReturn[0] !== -1) {
              let canGoPush = canGoReturn?.slice(0, 4);
              canGoPush && canGo.push(canGoPush);
            }
          }
        }
      }
      // левый верхний
      for (
        let y = activeChecker.positionY, numberOfenemises = 0;
        y >= 0 && numberOfenemises < 2;
        y--
      ) {
        for (let x = activeChecker.positionX; x >= 0; x--) {
          let checkerToEatId = pawn1.universalControlIsCheckerHere(
            activeChecker.positionY,
            activeChecker.positionX,
            y,
            x
          );
          let canGoReturn = findCanGoKing(
            checkerToEatId,
            numberOfenemises,
            activeChecker,
            arrayOfChecker,
            y,
            x
          );
          if (canGoReturn) {
            numberOfenemises = canGoReturn[4];
            if (canGoReturn[0] !== -1) {
              let canGoPush = canGoReturn?.slice(0, 4);
              canGoPush && canGo.push(canGoPush);
            }
          }
        }
      }
      //левый нижний
      for (
        let y = activeChecker.positionY, numberOfenemises = 0;
        y <= 7 && numberOfenemises < 2;
        y++
      ) {
        for (let x = activeChecker.positionX; x >= 0; x--) {
          let checkerToEatId = pawn1.universalControlIsCheckerHere(
            activeChecker.positionY,
            activeChecker.positionX,
            y,
            x
          );
          let canGoReturn = findCanGoKing(
            checkerToEatId,
            numberOfenemises,
            activeChecker,
            arrayOfChecker,
            y,
            x
          );
          if (canGoReturn) {
            numberOfenemises = canGoReturn[4];
            if (canGoReturn[0] !== -1) {
              let canGoPush = canGoReturn?.slice(0, 4);
              canGoPush && canGo.push(canGoPush);
            }
          }
        }
      }
      //правый верхний
      for (
        let y = activeChecker.positionY, numberOfenemises = 0;
        y >= 0 && numberOfenemises < 2;
        y--
      ) {
        for (let x = activeChecker.positionX; x <= 7; x++) {
          let checkerToEatId = pawn1.universalControlIsCheckerHere(
            activeChecker.positionY,
            activeChecker.positionX,
            y,
            x
          );
          let canGoReturn = findCanGoKing(
            checkerToEatId,
            numberOfenemises,
            activeChecker,
            arrayOfChecker,
            y,
            x
          );
          if (canGoReturn) {
            numberOfenemises = canGoReturn[4];
            if (canGoReturn[0] !== -1) {
              let canGoPush = canGoReturn?.slice(0, 4);
              canGoPush && canGo.push(canGoPush);
            }
          }
        }
      }
    }
    return canGo;
  };

  return checkerCanGo();
};
