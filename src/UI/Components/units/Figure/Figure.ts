// import { ChessDesc } from "../../ChessDesc/ChessDesc";
import { IFigureType } from "../interface/types";
// import { arr } from "../../ChessDesc/ChessDesc";
export class Pawn {
  constructor(
    public figureType: IFigureType,
    public positionY: number,
    public positionX: number,
    public isActive: boolean,
    public isKing: boolean,
    public canEatAgain: boolean,
    public figureId: number
  ) {}

  // передаем id и делаем фигурку активной
  activeFigure(figureId: number) {
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureId === figureId) {
        arrayOfChecker[i].isActive = !arrayOfChecker[i].isActive;
      }
    }
  }

  // передаем id и новую пазицию фигурки для смена пазиции фигурки
  changePosition(figureId: number, newPositionY: number, newPositionX: number) {
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureId === figureId) {
        arrayOfChecker[i].positionX = newPositionX;
        arrayOfChecker[i].positionY = newPositionY;
        if (
          newPositionY === 0 &&
          arrayOfChecker[i].figureType === "PawnWhite"
        ) {
          this.beCrowned(figureId);
        } else if (
          newPositionY === 7 &&
          arrayOfChecker[i].figureType === "PawnDark"
        ) {
          this.beCrowned(figureId);
        }
      }
    }
  }

  // делаем пешку дамкой
  beCrowned(figureId: number) {
    for (const checker of arrayOfChecker) {
      if (checker.figureId === figureId) {
        checker.isKing = true;
      }
    }
  }

  controlCanCheckerEatAgain() {
    const activeChecker = arrayOfChecker.find(
      (checker) => checker.isActive === true
    );
    console.log(activeChecker);

    const arrayOfEnemises = arrayOfChecker.filter(
      (checker) =>
        activeChecker &&
        checker.figureType !== activeChecker?.figureType &&
        Math.abs(checker.positionY - activeChecker.positionY) ===
          Math.abs(checker.positionX - activeChecker.positionX) &&
        activeChecker.positionY !== checker.positionY &&
        activeChecker.positionX !== checker.positionX
    );

    if (activeChecker) {
      for (let i = 0; i < arrayOfEnemises.length; i++) {
        let y = arrayOfEnemises[i].positionY - activeChecker.positionY;
        let x = arrayOfEnemises[i].positionX - activeChecker.positionX;
        let firstChecker = arrayOfChecker.find(
          (checker) =>
            checker.positionY === activeChecker.positionY + y &&
            checker.positionX === activeChecker.positionX + x
        );
        console.log(activeChecker.positionY + y, activeChecker.positionX + x);

        if (y < 0) {
          y--;
        } else {
          y++;
        }
        if (x < 0) {
          x--;
        } else {
          x++;
        }

        const secondChecker = arrayOfChecker.find(
          (checker) =>
            checker.positionY === activeChecker.positionY + y &&
            checker.positionX === activeChecker.positionX + x
        );
        if (
          activeChecker.positionY + y >= 0 &&
          activeChecker.positionY + y <= 7 &&
          activeChecker.positionX + x >= 0 &&
          activeChecker.positionX + x <= 7 &&
          secondChecker === undefined &&
          firstChecker
        ) {
          activeChecker.canEatAgain = true;
          return;
        } else {
          activeChecker.canEatAgain = false;
        }
      }
    }
  }

  // проверка на наличие врага в промежутке
  universalControlIsCheckerHere(
    //эта тварина будет переписана(или нет)
    positionY: number,
    positionX: number,
    newPositionY: number,
    newPositionX: number
  ) {
    // передаем старую и новую позицию, возвращаем id фигурки которая находится между ними
    const activeChecker = arrayOfChecker.find(
      (checker) =>
        checker.positionY === positionY && checker.positionX === positionX
    );
    if (
      Math.abs(newPositionY - positionY) ===
        Math.abs(newPositionX - positionX) &&
      newPositionY !== positionY &&
      newPositionX !== positionX &&
      activeChecker
    ) {
      let distinctionY = newPositionY - positionY;
      let distinctionX = newPositionX - positionX;
      const difference = distinctionX;
      const arrOfVictim1 = [];

      for (let i = 0; i < Math.abs(difference); i++) {
        distinctionX > 0 ? distinctionX-- : distinctionX++;
        distinctionY > 0 ? distinctionY-- : distinctionY++;
        if (distinctionY && distinctionX) {
          const foundedChecker = arrayOfChecker.find(
            (checker) =>
              checker.positionY === distinctionY + positionY &&
              checker.positionX === distinctionX + positionX
          );
          if (
            foundedChecker &&
            foundedChecker.figureType !== activeChecker.figureType
          ) {
            arrOfVictim1.push(foundedChecker);
          }
        }
      }
      if (arrOfVictim1.length === 1) {
        return arrOfVictim1[0].figureId;
      } else return undefined;
    }
  }

  // проверка на победу(остались ли пешки противоположной команде)
  isWin(figureType: IFigureType) {
    let arrayOfOponents = [];
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureType !== figureType) {
        arrayOfOponents.push(arrayOfChecker[i]);
      }
    }
    if (!arrayOfOponents[0]) {
      if (figureType === "PawnDark" || figureType === "PawnDarkKing") {
        console.log("PawnWhite wins");
        return true;
      } else {
        console.log("PawnDark wins");
        return true;
      }
    }
  }

  eatFigure(figureId: number | undefined) {
    //передаем id и удаляем из массива эту пешку
    let delitedChecker;
    if (figureId !== undefined) {
      delitedChecker = arrayOfChecker.find(
        (checker) => checker.figureId === figureId
      );
    }
    const temporarryArr = [];
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureId === figureId) delete arrayOfChecker[i];
      if (arrayOfChecker[i]) temporarryArr.push(arrayOfChecker[i]);
    }
    for (let i = 0; i < arrayOfChecker.length; i++) {
      arrayOfChecker[i] = temporarryArr[i];
    }
    arrayOfChecker = arrayOfChecker.filter((pawn) => pawn !== undefined);
    if (delitedChecker?.figureType) {
      this.isWin(delitedChecker?.figureType);
    }
  }
}

export let arrayOfChecker: Pawn[] = []; //расставляем пешки

arrayOfChecker.push(new Pawn("PawnDark", 4, 1, false, false, false, 0));
arrayOfChecker.push(new Pawn("PawnDark", 0, 1, false, false, false, 3));
arrayOfChecker.push(new Pawn("PawnDark", 5, 2, false, false, false, 5));
arrayOfChecker.push(new Pawn("PawnDark", 0, 5, false, false, false, 4));
arrayOfChecker.push(new Pawn("PawnDark", 3, 4, false, false, false, 1));
arrayOfChecker.push(new Pawn("PawnWhite", 5, 6, false, true, false, 2));
// (() => {
//   let x = 1;
//   let lineY = 0;
//   let lineX = 0;
//   let color = "PawnDark";
//   for (let i = 0; i < 24; i++, x = x + 2) {
//     if (i < 12) {
//       if (i < 4) {
//         lineX = x;
//       } else if (i > 3 && i <= 7) {
//         lineY = 1;
//         lineX = x - 9;
//       } else {
//         lineY = 2;
//         lineX = x - 16;
//       }
//     } else {
//       color = "PawnWhite";
//       if (i < 16) {
//         lineX = x - 25;
//         lineY = 7;
//       } else if (i > 15 && i <= 19) {
//         lineY = 6;
//         lineX = x - 32;
//       } else {
//         lineY = 5;
//         lineX = x - 41;
//       }
//     }
//     arrayOfChecker.push(
//       new Pawn(color as IFigureType, lineY, lineX, false, false, false, i)
//     );
//   }
// })();

export const pawn1 = new Pawn("PawnDark", 0, 1, false, true, false, 0);
