import React, { useEffect } from 'react';
import './app.css'
import { Board } from './components/Board';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Loading } from './components';
import { nanoid } from 'nanoid';
import { Squares } from './types'
import { ApiResponceType } from './types';
import { findPosition } from './util';

const App = () => {
  //loading, modes - general logic
  const [loadingState, setLoadingState] = useState<boolean>(true)
  const [modes, setModes] = useState<ApiResponceType | undefined>()
  const [mode, setMode] = useState<number | undefined>()
  //board state, operation
  const [boardLimit, setBoardLimit] = useState<number | undefined>(0)
  const [squares, setSquares] = useState<Squares | undefined>([])
  //label section
  const [labelContent, setLabelContent] = useState<string[] | []>([])
  //fetch
  useEffect(() => {
    const apiUrl = 'http://demo1030918.mockable.io/';
    axios.get(apiUrl).then((resp:AxiosResponse) => {
      try {
        setModes(resp.data)
        setLoadingState(false)
      }
      catch(e:any){
        console.log(e)
      }
    })
  }, [])
  //re-start
  useEffect(() => {
    setSquares(Array.from({length:boardLimit!}, () => ({'id': nanoid(), checked: false})))
    setLabelContent([])
  }, [boardLimit])

  //actions
  const modeChangeEventHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setBoardLimit(parseInt(e.currentTarget.value, 10))
  }
  const modeDisplaySwitch = (e:React.ChangeEvent<HTMLSelectElement>) => {
    let tempVar = parseInt(e.target.value, 10)
    setMode(tempVar)
  }
  const handleSquareClick = (id:string, index:number, boardLimit:number):void => {
    let updatedArray = [...squares!].map((square) => {
      if (square.id === id){
        square.checked = true
      }
      return square
    })
    let updatedContent = [...labelContent, findPosition(index, boardLimit)]
    setSquares(updatedArray)
    setLabelContent(updatedContent)
  }
  const handleSquareClickBack = (id:string, index:number, boardLimit:number):void => {
    let updatedArray = [...squares!].map((square) => {
      if (square.id === id){
        square.checked = false
      }
      return square
    })
    let updatedContent = [...labelContent].filter(item => 
      item !== findPosition(index, boardLimit)
    )
    
    setSquares(updatedArray)  
    setLabelContent(updatedContent)
  }
  if (loadingState){
    return (
      <>
        <Loading/>
      </>
    )
  }
  return (
    <div className="App">
      <div className="mainAppInterface">
        <div className="mainAppHeader">
          <select 
            name="modes" 
            className="modes" 
            onChange={modeDisplaySwitch}
            value={mode}
          >
            <option hidden>Select mode</option>
            <option value={Math.pow(modes!.easyMode.field, 2)}>Easy</option>
            <option value={Math.pow(modes!.normalMode.field, 2)}>Normal</option>
            <option value={Math.pow(modes!.hardMode.field, 2)}>Hard</option>
          </select>
          <button 
            className="okBtn"
            onClick={(e) => modeChangeEventHandler(e)}
            value={mode}
          >
            Start
          </button>
        </div>
        <div>
          <Board 
            boardLimit={boardLimit!}
            squares={squares!}
            handleSquareClick={handleSquareClick}
            handleSquareClickBack={handleSquareClickBack}
          />
        </div>
      </div>
      <div className="logAppInfo">
        <h1>Hover squares</h1>
        {
          labelContent.map(label => {
            return <div className='logAppItem' key={Math.random()}>{label}</div>
          })
        }
      </div>
    </div>
  );
}
export default App;
