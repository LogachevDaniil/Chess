import { FC, useState, createContext } from "react";
import { IProps, IContext } from "./Context.interface";
import { arr } from "../Components/ChessDesc/ChessDesc";

export const ProviderContext = createContext({} as IContext);

export const ProviderContextWrapper: FC<IProps> = ({ children }) => {
  //   const emptyArr: string[][] = Array.from(Array(8), () =>
  //     new Array(8).fill("")
  //   );
  const [arrayOfSquares, setArrayOfSquares] = useState<string[][]>(arr);
  const [active, setActive] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [winOpen, setWinOpen] = useState<boolean>(false);
  const [additionalMove, setAdditionalMove] = useState<boolean>(false);
  const [nextTurn, setNextTurn] = useState<boolean>(true);
  const chengeAdditionalMove = () => {
    setAdditionalMove(!additionalMove);
  };
  const chengeModalActive = () => {
    setModalOpen(!modalOpen);
  };
  const chengeWinActive = () => {
    setWinOpen(!winOpen);
  };
  const chengeActive = (activeType: boolean) => {
    // activeType && setActive(!active);
    // activeType && setNextTurn(!nextTurn);
    // setActive(!active)
    if (!activeType) {
      setNextTurn(!nextTurn);
    } else {
      setActive(!active);
    }
    // console.log(active);
  };
  const chengeNextTurn = () => {
    setNextTurn(!nextTurn);
  };
  // const switchArrayOfSquares = (arr: string[][]) => {
  //   setArrayOfSquares(arr);
  //   console.log("hi from context");
  // };

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

  const providerValue = {
    arrayOfSquares,
    chengePosition,
    active,
    chengeActive,
    modalOpen,
    chengeModalActive,
    winOpen,
    chengeWinActive,
    additionalMove,
    chengeAdditionalMove,
    nextTurn,
    chengeNextTurn,
  };
  return (
    <ProviderContext.Provider value={providerValue}>
      {children}
    </ProviderContext.Provider>
  );
};
