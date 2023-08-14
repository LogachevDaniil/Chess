import { FC, useState, createContext } from "react";
import { IProps, IContext } from "./Context.interface";
import { arr } from "../Components/ChessDesc/ChessDesc";

export const ProviderContext = createContext({} as IContext);

export const ProviderContextWrapper: FC<IProps> = ({ children }) => {

  const [arrayOfSquares, setArrayOfSquares] = useState<string[][]>(arr);
  const [active, setActive] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [winOpen, setWinOpen] = useState<boolean>(false);
  const [nextTurn, setNextTurn] = useState<boolean>(true);
  const [arrayCanGo, setArrCanGo] = useState<number[][]>([[0, 0, 0, 0]]);

  //открытие модального окна (уведомление "не твой ход")
  const chengeModalActive = () => {
    setModalOpen(!modalOpen);
  };

  //открытие модального окна окончания игры
  const chengeWinActive = () => {
    setWinOpen(!winOpen);
  };

  //меняет пешку на активную
  const chengeActive = (activeType: boolean) => {
    if (!activeType) {
      setNextTurn(!nextTurn);
    } else {
      setActive(!active);
    }
  };

  //следующий ход
  const chengeNextTurn = () => {
    setNextTurn(!nextTurn);
    console.log(active);
  };

  //меняет позицию шашки
  const chengePosition = (
    figureType: string,
    idy: number,
    idx: number,
    newIdx: number,
    newIdy: number
  ) => {
    arrayOfSquares[idy][idx] = "";
    arrayOfSquares[newIdy][newIdx] = figureType;
    setArrayOfSquares(arrayOfSquares);
    console.log(arrayOfSquares);
  };

  // меняет значение arrayCanGo
  const chengeArrayCanGo = (arrCanGo: number[][]) => {
    setArrCanGo(arrCanGo);
  };

  //применяет дефолтные значения к arrayCanGo
  const chengeDefaultArrayCanGo = () => {
    setArrCanGo([[-1, -1, -1, -1]]);
  };

  const providerValue = {
    arrayOfSquares,
    chengePosition,
    active,
    chengeActive,
    modalOpen,
    chengeModalActive,
    winOpen,
    chengeWinActive,
    nextTurn,
    chengeNextTurn,
    arrayCanGo,
    chengeArrayCanGo,
    chengeDefaultArrayCanGo,
  };

  return (
    <ProviderContext.Provider value={providerValue}>
      {children}
    </ProviderContext.Provider>
  );
};
