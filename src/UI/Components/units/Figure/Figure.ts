import { ChessDesc } from "../../ChessDesc/ChessDesc";
import { IFigureType } from "../interface/types";
import { arr } from "../../ChessDesc/ChessDesc";
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

  activeFigure(figureId: number) {
    // передаем id и делаем фигурку активной
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureId === figureId) {
        arrayOfChecker[i].isActive = !arrayOfChecker[i].isActive;
      }
    }
    // console.log(arrayOfChecker);
  }

  changePosition(figureId: number, newPositionY: number, newPositionX: number) {
    // передаем id и новую пазицию фигурки
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

  beCrowned(figureId: number) {
    for (const checker of arrayOfChecker) {
      if (checker.figureId === figureId) {
        checker.isKing = true;
      }
    }
    // console.log(arrayOfChecker);
  }

  controlCanCheckerEatAgain(newPositionY: number, newPositionX: number) {
    let arrOfEnemies = [];
    let eater;
    for (let index = 0; index < arrayOfChecker.length; index++) {
      // const element = array[index];
      if (
        arrayOfChecker[index].positionY === newPositionY &&
        arrayOfChecker[index].positionX === newPositionX
      ) {
        eater = arrayOfChecker[index];
      }
      if (
        (arrayOfChecker[index].positionY - 1 === newPositionY &&
          arrayOfChecker[index].positionX - 1 === newPositionX) ||
        (arrayOfChecker[index].positionY + 1 === newPositionY &&
          arrayOfChecker[index].positionX + 1 === newPositionX) ||
        (arrayOfChecker[index].positionY + 1 === newPositionY &&
          arrayOfChecker[index].positionX - 1 === newPositionX) ||
        (arrayOfChecker[index].positionY - 1 === newPositionY &&
          arrayOfChecker[index].positionX + 1 === newPositionX)
      ) {
        arrOfEnemies.push(arrayOfChecker[index]);
      }
    }
    console.log(arrOfEnemies);

    let arrayOfVoid = [];

    for (let indexE = 0; indexE < arrOfEnemies.length; indexE++) {
      for (let iC = 0; iC < arrayOfChecker.length; iC++) {
        if (eater && arrOfEnemies[0]) {
          let y = (arrOfEnemies[indexE].positionY - eater?.positionY) * 2;
          let x = (arrOfEnemies[indexE].positionX - eater?.positionX) * 2;
          if ( arrayOfChecker[iC].figureType !== eater.figureType &&
            arrayOfChecker[iC].positionY === eater.positionY + y &&
            arrayOfChecker[iC].positionX === eater.positionX + x
          ) {
            console.log(arrayOfChecker[iC]);
            console.log(arrOfEnemies[iC]);

            arrayOfVoid.push(arrOfEnemies[indexE]);
          }
        }
      }
    }
    console.log(arrayOfVoid[0]);
    console.log(arrayOfVoid);
    
    console.log(arrOfEnemies);

    if (
      arrayOfVoid[0] !== undefined &&
      arrayOfVoid.length !== arrOfEnemies.length &&
      eater
    ) {
      console.log(123);

      eater.canEatAgain = true;
      return true;
    }
    if (arrayOfVoid[0] === undefined) {
      for (let i = 0; i < arrayOfChecker.length; i++) {
        arrayOfChecker[i].canEatAgain = false;
      }
      return;
    }
    console.log(arrayOfChecker);
  }
  universalControlIsCheckerHere(
    positionY: number,
    positionX: number,
    newPositionY: number,
    newPositionX: number
  ) {
    // передаем старую и новую позицию, возвращаем id фигурки которая находится между ними

    let minY = Math.min(positionY, newPositionY);
    let maxY = Math.max(positionY, newPositionY);
    let minX = Math.min(positionX, newPositionX);
    let forPerem = maxY - minY;
    let arrOfVictim = []; //массив жертв
    for (let index = 1; index < forPerem; index++) {
      minY++;
      minX++;
      // console.log(minY, minX);
      for (let i = 0; i < arrayOfChecker.length; i++) {
        if (
          arrayOfChecker[i].positionY === minY &&
          arrayOfChecker[i].positionX === minX
        ) {
          // console.log(arrayOfChecker[i]);
          arrOfVictim.push(arrayOfChecker[i]);
        }
      }
      if (arrOfVictim.length === 1) {
        return arrOfVictim[0].figureId;
      } else return undefined;
      // console.log(arrayOfChecker);
    }
    // this.controlCanCheckerEatAgain(newPositionY, newPositionX, eaterId);
  }

  isWin(figureType: IFigureType) {
    // console.log(arrayOfChecker);
    let arrayOfOponents = [];
    for (let i = 0; i < arrayOfChecker.length; i++) {
      // const element = array[i];
      if (arrayOfChecker[i].figureType === figureType) {
        arrayOfOponents.push(arrayOfChecker[i]);
      }
    }
    // const arrayOfOponents = arrayOfChecker.find(
    //   (checker) => checker.figureType === figureType
    // );
    // console.log(figureType);
    // console.log(arrayOfOponents);

    if (!arrayOfOponents[0]) {
      console.log(figureType + " wins");
    }
    // else console.log("не wins(");
  }

  eatFigure(figureId: number | undefined) {
    //не помню зачем тут undef, но если он есть то от нужен
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
    // console.log(arrayOfChecker);
    if (delitedChecker?.figureType) {
      this.isWin(delitedChecker?.figureType);
    }
  }
}

// (() => {

// })()

export let arrayOfChecker: Pawn[] = []; //расставляем пешки

// arrayOfChecker.push(new Pawn("PawnDark", 5, 6, false, false, false, 1));
// arrayOfChecker.push(new Pawn("PawnDark", 3, 4, false, false, false, 2));
// arrayOfChecker.push(new Pawn("PawnWhite", 6, 7, false, false, false, 3));
(() => {
  let x = 1;
  let lineY = 0;
  let lineX = 0;
  let color = "PawnDark";
  for (let i = 0; i < 24; i++, x = x + 2) {
    if (i < 12) {
      if (i < 4) {
        lineX = x;
      } else if (i > 3 && i <= 7) {
        lineY = 1;
        lineX = x - 9;
      } else {
        lineY = 2;
        lineX = x - 16;
      }
    } else {
      color = "PawnWhite";
      if (i < 16) {
        lineX = x - 25;
        lineY = 7;
      } else if (i > 15 && i <= 19) {
        lineY = 6;
        lineX = x - 32;
      } else {
        lineY = 5;
        lineX = x - 41;
      }
    }
    arrayOfChecker.push(
      new Pawn(color as IFigureType, lineY, lineX, false, false, false, i)
    );
  }
})();

export const pawn1 = new Pawn("PawnDark", 0, 1, false, true, false, 0);

// export const pawn2 = new Pawn("PawnWhite", 7, 4, false, 1);
// export const pawn3 = new Pawn("PawnWhite", 7, 2, false, 2);
// export const pawn4 = new Pawn("PawnWhite", 7, 0, false, 3);
// export const pawn5 = new Pawn("PawnDark", 0, 3, false, 4);

// export let arrayOfChecker:Pawn[] = [pawn1, pawn2, pawn3, pawn4, pawn5]
