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
  const chengeModalActive = () => {
    setModalOpen(!modalOpen);
  };
  const chengeActive = () => {
    setActive(!active);
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
  };

  const providerValue = {
    arrayOfSquares,
    chengePosition,
    active,
    chengeActive,
    modalOpen,
    chengeModalActive,
    // switchArrayOfSquares,
  };
  return (
    <ProviderContext.Provider value={providerValue}>
      {children}
    </ProviderContext.Provider>
  );
};
