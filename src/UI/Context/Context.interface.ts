import { ReactNode } from "react";
interface IProps {
    children: ReactNode;
}

interface IForChange{ //надо вставить это в IContext
    active:boolean
}

interface IContext{
    arrayOfSquares:string[][];
    // switchArrayOfSquares(arr:string[][]):void
    chengePosition( figureType:string, idx:number, idy:number, newIdx:number, newIdy:number ):void;
    active:boolean;
    chengeActive():void
    modalOpen:boolean;
    chengeModalActive():void
}
export  type {IProps, IContext}