const slot = document.getElementById("slot")
const allCells = []
const matrixCells = []

function CreateCells(){
    for (let y = 0; y < 3; y++) {
        
        matrixCells[y] = []

        for (let x = 0; x < 5; x++) {

            const cell = document.createElement("div")
            cell.classList.add("cell");
            slot.appendChild(cell)
            allCells.push(cell)
            matrixCells[y].push(cell)
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

    for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                let position = new Vector2(GetRandomNumber(3),i)
                console.log(position)
                MarkCell(position)        
            }, 3000 * i);
    }
}

function MarkCell(position){
    matrixCells[position.x][position.y].classList.add("marked")
}

function GetRandomNumber(max){
    return Math.floor(Math.random() * max)
}

class Vector2{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

CreateCells()
SetNewSymbolsDistribution()
CreateNewPayline()