import { FC, useContext, useMemo } from "react";
import "./Square.css";
import { arrayOfChecker, pawn1 } from "../units/Figure/Figure";
import { arr } from "../ChessDesc/ChessDesc";
import { ProviderContext } from "../../Context/ProviderContext";
import { log } from "console";

interface SquareProps {
  figureType?: string;
  isEven: boolean;
  idx: number;
  idy: number;
}
// попробовать написать отталкиваясь от кликнутой клетки не соотвецтвующей функции перемещения
export const Square: FC<SquareProps> = ({ isEven, figureType, idy, idx }) => {
  const { active, chengeActive, modalOpen, chengeModalActive } =
    useContext(ProviderContext);
  const color = useMemo(() => {
    if (isEven) {
      return "white";
    }
    return "dark";
  }, [isEven]);

  // useEffect(() => {}, [active]);

  const clickOnFigure = () => {
    for (let i = 0; i < arrayOfChecker.length; i++) {
      arrayOfChecker[i].isActive = false;
      if (
        arrayOfChecker[i].positionY === idy &&
        arrayOfChecker[i].positionX === idx
      ) {
        // console.log(arrayOfChecker[i]);

        pawn1.activeFigure(arrayOfChecker[i].figureId);
      }
    }
  };
  const controlEatFigure = (
    figureType: string | undefined,
    idy: number | undefined,
    idx: number | undefined
  ) => {
    for (const checker of arrayOfChecker) {
      if (
        checker.figureType !== figureType &&
        idy === checker.positionY &&
        idx === checker.positionX
      ) {
        pawn1.eatFigure(checker.figureId);
        return;
      }
    }
  };

  //написать функцию, которая будет проверять есть ли на ней кто-то и если нет то ходить
  // вторая функция бедет есть.

  const voidClickHandler = () => {
    console.log("click");

    for (let i = 0; i < arrayOfChecker.length; i++) {
      if (
        !isEven &&
        arrayOfChecker[i].positionY !== idy &&
        arrayOfChecker[i].positionX !== idx
      ) {
        if (arrayOfChecker[i].isActive === true) {
          for (const checker of arrayOfChecker) {
            if (
              arrayOfChecker[i].figureType === "PawnDark" &&
              idy > arrayOfChecker[i].positionY &&
              idy === arrayOfChecker[i].positionY + 1 &&
              (idx === arrayOfChecker[i].positionX + 1 ||
                idx === arrayOfChecker[i].positionX - 1)
            ) {
              if (active === false) {
                chengeActive();
                pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
                pawn1.activeFigure(arrayOfChecker[i].figureId);
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
                chengeActive();
                pawn1.changePosition(arrayOfChecker[i].figureId, idy, idx);
                pawn1.activeFigure(arrayOfChecker[i].figureId);
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
              console.log("zazzaza");

              if (active === true && arrayOfChecker[i].isActive === true) {
                console.log(checker);
                const checkerToEat = pawn1.controlIsCheckerHere(
                  arrayOfChecker[i].positionY,
                  arrayOfChecker[i].positionX,
                  idy,
                  idx
                );
                if (checkerToEat === undefined) {
                  pawn1.activeFigure(arrayOfChecker[i].figureId);
                } else {
                  chengeActive();
                  console.log(arrayOfChecker[i]);
                  pawn1.eatFigure(checkerToEat);
                  pawn1.changePosition(
                    arrayOfChecker[i - 1].figureId,
                    idy,
                    idx
                  );
                  pawn1.activeFigure(arrayOfChecker[i].figureId);
                }
              } else {
                pawn1.activeFigure(arrayOfChecker[i].figureId);
                chengeModalActive();
              }
            } else return;
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
