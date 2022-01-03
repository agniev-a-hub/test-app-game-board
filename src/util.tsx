export const classHelper = (number:number):string => {
    if (number === 25){
        return 'BoardEasy'
    }
    if (number === 100){
        return 'BoardNormal'
    }
    if (number === 225){
        return 'BoardHard'
    }
    return ''
}

export const findPosition = (index:number, boardLimit:number):string => {
    let tempIndex = index + 1;
    let row = 1;
    let col = 1;
    let rowLimit = Math.sqrt(boardLimit) //5 / 10 / 15
    while(tempIndex > rowLimit){
        tempIndex-=rowLimit
        row += 1
    }
    col = tempIndex || 1
    return `Row: ${row}, Col: ${col}`
}