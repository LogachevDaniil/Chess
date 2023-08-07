import React from "react";
import { Pawn } from "../Figure/Figure";

export const FindCanGoKing = (
  checkerToEatId: number | undefined,
  checkerToEatIdByKing: number | undefined,
  numberOfenemises: number,
  activeChecker: Pawn,
  arrayOfChecker: Pawn[],
  y: number,
  x: number
) => {
  // console.log(numberOfenemises);
  // const {numberOfenemises, chengeNumberOfenemises} = useContext(ProviderContext)
  checkerToEatId && (checkerToEatIdByKing = checkerToEatId);
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
    // console.log("aasdasd");
    numberOfenemises = numberOfenemises + 1;
    return;
  }
  // console.log(numberOfenemises);

  if (
    Math.abs(y - activeChecker.positionY) ===
      Math.abs(x - activeChecker.positionX) &&
    activeChecker.positionY !== y &&
    activeChecker.positionX !== x
  ) {
    if (numberOfenemises === 0) {
      return [y, x, 1, -1];
    } else if (numberOfenemises === 1 && checkerToEatIdByKing) {
      return [y, x, 2, checkerToEatIdByKing];
    } else if (numberOfenemises === 1) {
      return [-1, -1, -1, -1, numberOfenemises];
    } else return undefined;
    // console.log(numberOfenemises);
  }
  // console.log(numberOfenemises);
};
