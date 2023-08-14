import React from "react";
import { Pawn } from "../Figure/Figure";

export const findCanGoKing = (
  checkerToEatId: number | undefined,
  numberOfenemises: number,
  activeChecker: Pawn,
  arrayOfChecker: Pawn[],
  y: number,
  x: number
) => {
  if (
    // numberOfenemises === 2 ||
    activeChecker.figureType ===
    arrayOfChecker.find(
      (checker) => checker.positionY === y && checker.positionX === x
    )?.figureType
  ) {
    return;
  }

  if (
    //мб следующие 2 строчки можно закоментить
    Math.abs(y - activeChecker.positionY) ===
      Math.abs(x - activeChecker.positionX) &&
    activeChecker.positionY !== y &&
    activeChecker.positionX !== x
  ) {
    if (
      Math.abs(y - activeChecker.positionY) ===
        Math.abs(x - activeChecker.positionX) &&
      activeChecker.figureType !==
        arrayOfChecker.find(
          (checker) => checker.positionY === y && checker.positionX === x
        )?.figureType &&
      undefined !==
        arrayOfChecker.find(
          (checker) => checker.positionY === y && checker.positionX === x
        )?.figureType
    ) {
      numberOfenemises++;
      return [-1, -1, -1, -1, numberOfenemises];
    }
    if (numberOfenemises === 0) {
      return [y, x, 1, -1, numberOfenemises];
    } else if (numberOfenemises === 1 && checkerToEatId !== undefined) {
      return [y, x, 2, checkerToEatId, numberOfenemises];
    }
  }
};
