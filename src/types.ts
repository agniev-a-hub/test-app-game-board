export type Squares = Array<SquareInterface>

export interface SquareInterface {
    id: string | undefined
    checked: boolean
}

export interface ModeType {
    field:number
}
  
export interface ApiResponceType {
    easyMode:ModeType
    normalMode:ModeType
    hardMode:ModeType
}