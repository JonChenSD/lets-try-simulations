import "./main.css";

// src/main.js

// canvas
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// canvas width
let canvasW = 400
// canvas height
let canvasH = 400
// Padding
let p = 0
//box width/height
let boxWH = 20

//instantiate boxes for grid
let arrayOfBoxes = []
function clearedGrid(){
    context.clearRect(0, 0, canvasH, canvasW);
    drawBoard()
    arrayOfBoxes = []
    for (let x = 0; x < (canvasW/boxWH); x += 1) {
        arrayOfBoxes.push([])
        for (let y = 0; y < canvasW; y += boxWH) {
                arrayOfBoxes[x].push(false)
        }
    
    }
}

// console.log(arrayOfBoxes)

//randomizes the grid with squares
function randomizeGrid(){
    context.clearRect(0, 0, canvasH, canvasW);
    drawBoard()
    arrayOfBoxes = []
    for (let x = 0; x < (canvasW/boxWH); x += 1) {
        arrayOfBoxes.push([])
        for (let y = 0; y < canvasW; y += boxWH) {
            if(Math.floor(Math.random() * (document.getElementById('randomInterval').value) * .4) === 0){
                arrayOfBoxes[x].push(true)
            }
            else{
                arrayOfBoxes[x].push(false)
            }
            
        }
    
    }
}
//clears the grid of rectangles
function clearGrid(){
    context.clearRect(0, 0, canvasH, canvasW);
    drawBoard()
    arrayOfBoxes = []
    for (let x = 0; x < (canvasW/boxWH); x += 1) {
        arrayOfBoxes.push([])
        for (let y = 0; y < canvasW; y += boxWH) {
                arrayOfBoxes[x].push(false)
            
            
        }
    
    }
}

//Draw Grid

function drawBoard(){
    for (let x = boxWH; x < canvasW; x += boxWH) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, canvasH + p);
    }

    for (let x = boxWH; x < canvasH; x += boxWH) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(canvasW + p, 0.5 + x + p);
    }
    context.strokeStyle = "black";
    context.stroke();
}

//goes through array of boxes and draws the rectangles
function drawRectangles(){
    context.clearRect(0, 0, canvasH, canvasW);
    drawBoard()
    for (let x = 0; x < canvasW; x += boxWH) {
        for (let y = 0; y < canvasW; y += boxWH) {
            // console.log(arrayOfBoxes[x/boxWH][y/boxWH])
            if(arrayOfBoxes[x/boxWH][y/boxWH] === true){
                context.fillRect(x, y,boxWH,boxWH)
            }
            
        }

    }

    
    context.fillStyle = "black";
    context.fill();
}
clearedGrid();

//Game of life mechanics

/*
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++){
        let column = (2 + i + boxWH) % boxWH
        let row = (2 + j + boxWH) % boxWH
        console.log(column,row)
    }
}
//runs through one cycle of the game 
function oneCycle(){
    console.log(arrayOfBoxes)
    const tempArray = arrayOfBoxes
    clearedGrid()
    for (let y = 0; y < tempArray.length; y += 1){
        for (let x = 0; x < tempArray.length; x += 1){
            let aliveNeighbours = 0
            //console.log('done')
            //console.log(tempArray[x+1][y])
            //convulution for loop
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++){
                    
                        let column = (x + i + boxWH) % boxWH
                        let row = (y + j + boxWH) % boxWH
                       
                        if(tempArray[column][row]){
                            aliveNeighbours += 1
                        }

                        
                    
                   
                }
            }
            if(tempArray[x][y] == true){
                aliveNeighbours -= 1
            }
            if(aliveNeighbours > 0){
                console.log(aliveNeighbours, y, x)
            }
            
            if(tempArray[x][y] == false && aliveNeighbours == 3){
                arrayOfBoxes[x][y] = true
                console.log('keep alive tempArray', x, y, '2-3 alive', aliveNeighbours)
            }
            else if(tempArray[x][y] == true && (aliveNeighbours < 2 || aliveNeighbours > 3)){
                arrayOfBoxes[x][y] = false
                console.log('kill tempArray', x, y, '2-3 alive', aliveNeighbours)
            }
            else{
                arrayOfBoxes[x][y] = tempArray[x][y]
            }
        }
    }
    console.log(arrayOfBoxes)
    drawRectangles()

}


//controls

//click on canvas to add a box
canvas.addEventListener("click", (e) => {
    
    const canvasDIM = canvas.getBoundingClientRect()
    //gets box location and gets grid index location
    const x = Math.floor((e.clientX - canvasDIM.left)/20)
    const y = Math.floor((e.clientY - canvasDIM.top)/20)

    arrayOfBoxes[x][y] = !arrayOfBoxes[x][y]
    let tempArray = arrayOfBoxes
    clearGrid()
    arrayOfBoxes = tempArray
    drawRectangles()
    console.log(x,y)
    console.log(arrayOfBoxes[x])
})

//Button commands

//randomizes grid
document.getElementById('randomBtn').addEventListener("click", (e) => {
    randomizeGrid()
    drawRectangles()
})

//clears the grid
document.getElementById('clearBtn').addEventListener("click", (e) => {
    clearGrid()
})


//runs the cycles
const startBtn = document.getElementById('startBtn')

startBtn.addEventListener("click", (e) => {
    if(startBtn.innerHTML == 'start'){
        setCycle = setInterval(oneCycle, 50 * document.getElementById('stepInterval').value)
        startBtn.innerHTML = 'pause'
        startBtn.style = 'color: red;'
    }
    else{
        clearInterval(setCycle)
        startBtn.style = 'color: black;'
        startBtn.innerHTML = 'start'
    }
    
})
