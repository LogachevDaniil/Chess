import { ChessDesc } from "../../ChessDesc/ChessDesc";
import { IFigureType } from "../interface/types";
import { arr } from "../../ChessDesc/ChessDesc";
export class Pawn {
  constructor(
    public figureType: IFigureType,
    public positionY: number,
    public positionX: number,
    public isActive: boolean,
    public figureId: number 
  ) { }

  activeFigure(figureId:number){
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureId === figureId) {
        arrayOfChecker[i].isActive = !arrayOfChecker[i].isActive 
        // console.log(arrayOfChecker)
      }      
    }
  }
  changePosition(figureId: number , newPositionY: number, newPositionX: number, ) {
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (arrayOfChecker[i].figureId === figureId) {
        arrayOfChecker[i].positionX = newPositionX
        arrayOfChecker[i].positionY = newPositionY
      }        
    }
    // console.log(arrayOfChecker[0]);      
  }

  controlIsCheckerHere(positionY: number, positionX: number, newPositionY: number, newPositionX: number){
    const moduleY = Math.abs( positionY - newPositionY ) / 2
    const averageY = moduleY + Math.min( positionY, newPositionY )
    
    const moduleX = Math.abs( positionX - newPositionX ) / 2
    const averageX = moduleX + Math.min( positionX, newPositionX )

    for (let i = 0; i < arrayOfChecker.length; i++) {
      if ( averageY === arrayOfChecker[i].positionY && averageX === arrayOfChecker[i].positionX ) {
        
        // const arrayOfValues = new Map([
        //   ['figureType', arrayOfChecker[i].figureType],
        //   ['positionY', arrayOfChecker[i].positionY],
        //   ['positionX', arrayOfChecker[i].positionX]
        // ]);
        return arrayOfChecker[i].figureId
        // { figureType: arrayOfChecker[i].figureType, positionY: arrayOfChecker[i].positionY, positionX: arrayOfChecker[i].positionX}
        // this.eatFigure(arrayOfChecker[i].figureId)
      }
    }
  }
  
  eatFigure(figureId: number|undefined){
    const temporarryArr = []
    for (let i = 0; i < arrayOfChecker.length; i++) {
      if(arrayOfChecker[i].figureId === figureId) delete arrayOfChecker[i]
      if (arrayOfChecker[i]) temporarryArr.push(arrayOfChecker[i])
    }
    for (let i = 0; i < arrayOfChecker.length; i++) {
      arrayOfChecker[i] = temporarryArr[i]
      }
    arrayOfChecker = arrayOfChecker.filter(pawn => pawn !== undefined)
      console.log(arrayOfChecker)
  }
}

// (() => {

// })()

export let arrayOfChecker:Pawn[] = []

const func = () => {
  let x = 1;
  let lineY = 0;
  let lineX = 0;
  let color = "PawnDark"
  for (let i = 0; i < 24; i++,x=x+2) {
    if (i < 12) {
      if (i < 4) {
        lineX = x
      }
      else if (i > 3 && i <= 7) {
        lineY = 1
        lineX = x - 9
        
      }else {
        lineY = 2
        lineX = x - 16
      }
    } else {
      color = "PawnWhite"
      if (i < 16) {
        lineX = x - 25
        lineY = 7
      }
      else if (i > 15 && i <= 19) {
        lineY = 6
        lineX = x - 32
        
      }else {
        lineY = 5
        lineX = x - 41
      }
    }
    arrayOfChecker.push(new Pawn(color as IFigureType, lineY, lineX, false, i))
  }  
}
func()

export const pawn1 = new Pawn("PawnDark", 0, 1, false, 0);

// export const pawn2 = new Pawn("PawnWhite", 7, 4, false, 1);
// export const pawn3 = new Pawn("PawnWhite", 7, 2, false, 2);
// export const pawn4 = new Pawn("PawnWhite", 7, 0, false, 3);
// export const pawn5 = new Pawn("PawnDark", 0, 3, false, 4);

// export let arrayOfChecker:Pawn[] = [pawn1, pawn2, pawn3, pawn4, pawn5]