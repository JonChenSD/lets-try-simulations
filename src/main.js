import "./main.css";
import * as Tone from 'tone'

// src/main.js

//synth
const notes = ['C','C#','D','D#','E','F','G','G#','A','A#','B']

const now = Tone.now()

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
const synth = new Tone.Synth().toDestination();

const monoSynth = new Tone.MonoSynth({
	oscillator: {
		type: "square"
	},
	envelope: {
		attack: 0.1
	}
}).toDestination();

Tone.start()

synth.triggerAttackRelease("C4", "8n");
// canvas
let canvas = document.getElementById("canvas")
let background = document.getElementById("canvas-background")
let context = canvas.getContext("2d")
let backgroundContext = background.getContext("2d")

context.font = 'italic 400 80px, sans-serif';
// canvas width
let canvasW = 600
// canvas height
let canvasH = 600
// Padding
let p = 0
//box width/height
let boxWH = 20

// Chosen block
let currentBlock = '→'

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
                arrayOfBoxes[x].push(currentBlock)
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
function drawBackground(){
    for (let y = 0; y < canvasW; y += boxWH) {
        for (let x = 0; x < canvasW; x += boxWH) {
            // console.log(arrayOfBoxes[x/boxWH][y/boxWH])
            if (((x/boxWH) % 2 == 0 && (y/boxWH) % 2 == 0) || ((x/boxWH) % 2 != 0 && (y/boxWH) % 2 != 0)){
                backgroundContext.fillStyle = "#4AE137"
            } else{
                backgroundContext.fillStyle = "#A4F0AF"
            }
                
                backgroundContext.fillRect(x, y,boxWH,boxWH)
            
            
        }

    }
}
drawBackground()

function drawBoard(){
        
   
    
    
  

}

//goes through array of boxes and draws the rectangles
function drawRectangles(){
    context.clearRect(0, 0, canvasH, canvasW);
    drawBoard()
    for (let x = 0; x < canvasW; x += boxWH) {
        for (let y = 0; y < canvasW; y += boxWH) {
            // console.log(arrayOfBoxes[x/boxWH][y/boxWH])
            console.log(arrayOfBoxes[x/boxWH][y/boxWH])
            
            if(typeof arrayOfBoxes[x/boxWH][y/boxWH] == "string"){
                
                context.font = ' 24px sans-serif'
                context.fillStyle = "yellow"
                if(arrayOfBoxes[x/boxWH][y/boxWH] !== false){
                    console.log(arrayOfBoxes[x/boxWH][y/boxWH])
                }
                context.fillText(arrayOfBoxes[x/boxWH][y/boxWH], x, (y +18), boxWH)
            }
            
        }

    }

    

}
clearedGrid();

//Game of life mechanics



//runs through one cycle of the game 
let interval = 0
function oneCycle(){
    if (interval == 3){
        interval = 0
    } else {
        interval = interval + 1
    }
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
                    
                        // let column = (x + i + boxWH) % boxWH
                        // let row = (y + j + boxWH) % boxWH
                       
                        // if(tempArray[column][row]){
                        //     aliveNeighbours += 1
                        // }

                        
                    
                   
                }
            }
            
            console.log(typeof tempArray[x][y])
            if(typeof tempArray[x][y] === 'string'){
                //block generators
                //🡸 🡺 🡹 🡻  🡨 🡪 🡩 🡫 
                if(tempArray[x][y] === '🡸'){
                    arrayOfBoxes[x][y] = '🡸'
                    arrayOfBoxes[x - 1][y] = '←'
                }
                if(tempArray[x][y] === '🡺'){
                    arrayOfBoxes[x][y] = '🡺'
                    arrayOfBoxes[x + 1][y] = '→'
                }
                if(tempArray[x][y] === '🡹'){
                    arrayOfBoxes[x][y] = '🡹'
                    arrayOfBoxes[x][y + 1] = '↑'
                }
                if(tempArray[x][y] === '🡻'){
                    arrayOfBoxes[x][y] = '🡻'
                    arrayOfBoxes[x][y - 1] = '↓'
                }
                if(tempArray[x][y] === '🡨'){
                    arrayOfBoxes[x][y] = '🡨'
                    if( interval == 0){
                        arrayOfBoxes[x - 1][y] = '←'
                    }
                    
                }
                if(tempArray[x][y] === '🡪'){
                    arrayOfBoxes[x][y] = '🡪'
                    if( interval == 0){
                        arrayOfBoxes[x + 1][y] = '→'
                    }
                    
                }
                if(tempArray[x][y] === '🡩'){
                    arrayOfBoxes[x][y] = '🡩'
                    if( interval == 0){
                        arrayOfBoxes[x][y - 1] = '↑'
                    }
                    
                }
                if(tempArray[x][y] === '🡫'){
                    arrayOfBoxes[x][y] = '🡫'
                    if( interval == 0){
                        arrayOfBoxes[x][y + 1] = '↓'
                    }
                    
                }


                //arrow notes
                if(tempArray[x][y] === '→'){
                        console.log('move flower')
                    let tempChar = tempArray[x][y]
                    console.log(tempChar)
                    arrayOfBoxes[x][y] = false
                    if((x + 1) == (tempArray.length - 1)){
                        const note = notes[(y % 11)]
                        synth.triggerAttackRelease(note + 4, now);
                        //synth.triggerAttackRelease(note + 4, "8n");
                    }
                    if((x + 1) !== (tempArray.length)){
                        console.log('should continue')
                        arrayOfBoxes[x + 1][y] = tempChar
                    }
                }
                if(tempArray[x][y] === '←'){
                    console.log('move flower')
                let tempChar = tempArray[x][y]
                console.log(tempChar)
                arrayOfBoxes[x][y] = false
                if((x - 1) == -1){
                    const note = notes[(y % 11)]
                    synth.triggerAttackRelease(note + 4, now);
                    //synth.triggerAttackRelease(note + 4, "8n");
                }
                if((x - 1) !== -1){
                    console.log('should continue')
                    arrayOfBoxes[x - 1][y] = tempChar
                }
            }
                if(tempArray[x][y] === '↓'){
                    console.log('move flower')
                let tempChar = tempArray[x][y]
                console.log(tempChar)
                arrayOfBoxes[x][y] = false
                if((y + 1) == (tempArray.length - 1)){
                    const note = notes[(x % 11)]
                    monoSynth.triggerAttackRelease(note + 3, now);
                    //synth.triggerAttackRelease(note + 4, "8n");
                }
                if((y + 1) !== (tempArray.length)){
                    console.log('should continue')
                    arrayOfBoxes[x][y + 1] = tempChar
                }
            }

                if(tempArray[x][y] === '↑'){
                    console.log('move flower')
                let tempChar = tempArray[x][y]
                console.log(tempChar)
                arrayOfBoxes[x][y] = false
                if((y - 1) == -1){
                    const note = notes[(x % 11)]
                    polySynth.triggerAttackRelease(note + 4, now);
                    //synth.triggerAttackRelease(note + 4, "8n");
                }
                if((y - 1) !== -1){
                    console.log('should continue')
                    arrayOfBoxes[x][y - 1] = tempChar
                }
            }
                
                
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

   
    if(typeof arrayOfBoxes[x][y] == "string"){
        arrayOfBoxes[x][y] = false
    }else{
        arrayOfBoxes[x][y] = currentBlock
    }


    let tempArray = arrayOfBoxes
    clearGrid()
    arrayOfBoxes = tempArray
    drawRectangles()
    console.log(x,y)
    console.log(arrayOfBoxes[x])
})

//Button commands

// randomizes grid
document.getElementById('randomBtn').addEventListener("click", (e) => {
    randomizeGrid()
    drawRectangles()
})

// clears the grid
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

// instantiate buttons for tools

let blockBtns = document.getElementsByClassName('block')

console.log(blockBtns)

for (let i = 0; i < blockBtns.length; i++) {
    blockBtns[i].addEventListener("click", (e) => {
        
        currentBlock = blockBtns[i].innerText
    })
}

// const flowerBtn = document.getElementById('flower')
// const leftBtn = document.getElementById('left')
// const rightBtn = document.getElementById('right')
// const downBtn = document.getElementById('down')
// const upBtn = document.getElementById('up')

// flowerBtn.addEventListener("click", (e) => {
//     currentBlock = '✿'
// })


// leftBtn.addEventListener("click", (e) => {
//     currentBlock = '🡄'
// })

// rightBtn.addEventListener("click", (e) => {
//     currentBlock = '🡆'
// })

// downBtn.addEventListener("click", (e) => {
//     currentBlock = '🡇'
// })

// upBtn.addEventListener("click", (e) => {
//     currentBlock = '🡅'
// })

//starts tone.js

document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})