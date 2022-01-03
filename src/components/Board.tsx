import React from 'react';
import '../app.css';
import { Squares } from '../types';
import { classHelper } from '../util'
import { Square } from './components/'

interface IProps {
    squares: Squares;
    boardLimit: number;
    handleSquareClick:(id:string, index:number, boardLimit:number) => void
    handleSquareClickBack:(id:string, index:number, boardLimit:number) => void
}

export const Board = ({squares, boardLimit, handleSquareClick, handleSquareClickBack}:IProps) => {
    return (
        <div className={classHelper(squares.length)}>
            {squares.map((square, index) => 
                <Square 
                    square={square}
                    key={Math.random()}
                    index={index}
                    boardLimit={boardLimit}
                    handleSquareClick={handleSquareClick}
                    handleSquareClickBack={handleSquareClickBack}

                />
            )}
        </div>
    );
}

