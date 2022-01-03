import React from 'react';
import '../../app.css';
import { SquareInterface } from '../../types';

interface IProps{
    key: number;
    index: number;
    boardLimit: number
    square:SquareInterface
    handleSquareClick:(id:string, index:number, boardLimit:number) => void
    handleSquareClickBack:(id:string, index:number, boardLimit:number) => void
}
export const Square = ({index, boardLimit, square, handleSquareClick, handleSquareClickBack}:IProps) => {
    if (square.checked){
        return (
            <div 
                onMouseEnter={() => handleSquareClickBack(square.id!, index, boardLimit)}
                className='squareHovered'
            >
            </div>)
    }
    return (
        <div 
            onMouseEnter={() => handleSquareClick(square.id!, index, boardLimit)}
            className='square'
        >
        </div>
    )
}

