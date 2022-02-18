const slot = document.getElementById("slot")
const allCells = []
const matrixCells = []
const height = 6
const width = 10
const markedCells = []

function CreateCells(){
    for (let x = 0; x < width; x++) {
       matrixCells[x] = []
    }

    for (let y = 0; y < height; y++) {
        
        for (let x = 0; x < width; x++) {

            const cell = document.createElement("div")
            cell.classList.add("cell");
            cell.textContent = `${x} - ${y}`
            slot.appendChild(cell)
            allCells.push(cell)
            matrixCells[x].push(cell)
        }
    }
}

function SetNewSymbolsDistribution(){
     allCells.forEach(cell => {
        const rand = GetRandomNumber(3)
        let cellClass;

        switch(rand){
            case 0:
                cellClass = "bad"
                break;
            case 1:
                cellClass = "medium"
                break;
            case 2:
                cellClass = "good"
                break;
        }

        cell.className = "cell"
        cell.classList.add(cellClass)
    });
}

function CreateNewPayline(){
    let position = new Vector2(0, 0)
    MarkCell(position)        
    let loop = true;
    i = 1;
    while(loop == true) {
        setTimeout(() => {
            let directions = GetPossibleDirections(position)

            const rand = GetRandomNumber(directions.length)

            switch(directions[rand]){
                case "UP":
                    position.y-- 
                    break
                case "DOWN":
                    position.y++
                    break
                case "RIGHT":
                    position.x++
                    break
                default:
                    console.log("aa")
                    break;
            }

            MarkCell(position)        
        }, 1 * i);

        i++
    }
}

function GetPossibleDirections(position){
    let directions = []

    if(!(position.y + 1 >= height) && ValidCell(new Vector2(position.x, position.y + 1))){
        directions.push("DOWN")
    }
    
    if(position.y != 0 && ValidCell(new Vector2(position.x, position.y - 1))){
        directions.push("UP")
    }

    if(!(position.x + 1 >= width)){
        directions.push("RIGHT")
    }

    return directions
}

function MarkCell(position){
    console.log(`marking cell ${position.x}-${position.y}`)
    matrixCells[position.x][position.y].classList.add("marked")
    markedCells.push(new Vector2(position.x,position.y))
}

function GetRandomNumber(max){
    return Math.floor(Math.random() * max)
}
function GetRandomNumberMinMax(min,max){
    return min + Math.floor(Math.random() * max)
}
function Clamp(number, min, max){
    if(number > max){
        return max
    }
    else if(number < min){
        return min
    }
    else{
        return number
    }
}
function ValidCell(position){
    console.log("------------------")
    let valid = true;
    markedCells.forEach(cell => {
        console.log("cell " + cell.x + "-" + cell.y)
        console.log("position " + position.x + "-" + position.y)
        
        if(cell.x == position.x && cell.y == position.y){
            console.log("invalid")
            valid = false;
        }
    });
    return valid
}

class Vector2{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

slot.style.gridTemplateColumns = `repeat(${width},1fr)`
slot.style.gridTemplateRows = `repeat(${height},1fr)`

CreateCells()
SetNewSymbolsDistribution()
CreateNewPayline()