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

const sampler = new Tone.Sampler({
	urls: {
		A1: "bark.mp3",
		A2: "bark2.mp3",
	},
	baseUrl: "./assets/",
	onload: () => {
		sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
	}
}).toDestination();

const bongo = new Tone.Sampler({
	urls: {
		A1: "bongo1.mp3",
		A2: "bongo2.mp3",
	},
	baseUrl: "./assets/",
	onload: () => {
		bongo.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
	}
}).toDestination();

const trumpet = new Tone.Sampler({
	urls: {
		G2: "trumpetG2.mp3",
		
	},
	baseUrl: "./assets/",
	onload: () => {
		trumpet.triggerAttackRelease(["C1", "E1", "G1", "B1"], .8);
	}
}).toDestination();

const player = new Tone.Player("./assets/bark.mp3").toDestination();
Tone.loaded().then(() => {
	player.start();
});

Tone.start()

//synth.triggerAttackRelease("C4", "8n");

//ascii list

const arrowTypes = ['←','→','↑','↓']
const spinnerTypes = ['│','⟋','―','⟍']

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
let arrayOfAgents = []
function clearedGrid(){
    context.clearRect(0, 0, canvasH, canvasW);
    drawBoard()
    arrayOfBoxes = []
    arrayOfAgents = []
    for (let x = 0; x < (canvasW/boxWH); x += 1) {
        arrayOfBoxes.push([])
        arrayOfAgents.push([])
        for (let y = 0; y < canvasW; y += boxWH) {
                arrayOfBoxes[x].push(false)
                arrayOfAgents[x].push(false)
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
    arrayOfAgents = []
    for (let x = 0; x < (canvasW/boxWH); x += 1) {
        arrayOfBoxes.push([])
        arrayOfAgents.push([])
        for (let y = 0; y < canvasW; y += boxWH) {
                arrayOfBoxes[x].push(false)
                arrayOfAgents[x].push(false)
            
            
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
            //console.log(arrayOfBoxes[x/boxWH][y/boxWH])
            let boxFilled = false
            //checks if the index is a string and draws the block
            if(typeof arrayOfBoxes[x/boxWH][y/boxWH] == "string"){
                boxFilled = true
                context.font = ' 24px sans-serif'
                
                context.fillStyle = "yellow"
                if(arrayOfBoxes[x/boxWH][y/boxWH] !== false){
                    //console.log(arrayOfBoxes[x/boxWH][y/boxWH])
                }
                context.fillText(arrayOfBoxes[x/boxWH][y/boxWH], x, (y +18), boxWH)
            }

            //same drawing proccess but for agents
            if(typeof arrayOfAgents[x/boxWH][y/boxWH] == "string"){
                
                context.font = ' 24px sans-serif'
                if(arrayOfAgents[x/boxWH][y/boxWH] == "⇈"){
                    context.fillStyle = "white"
                } else{
                    context.fillStyle = "yellow"
                }
                
                if(arrayOfAgents[x/boxWH][y/boxWH] !== false){
                    //console.log(arrayOfAgents[x/boxWH][y/boxWH])
                }
                //shifts the agent drawing a little to the right to overlay
                if(boxFilled){
                    context.fillText(arrayOfAgents[x/boxWH][y/boxWH], (x + 8), (y +18), boxWH)

                }else{
                    context.fillText(arrayOfAgents[x/boxWH][y/boxWH], x, (y +18), boxWH)

                }
            }
            
        }

    }

    

}
clearedGrid();

//Simulation mechanics

//Functions for behavior


function dogGrabNote(tempArray,x,y){
    let tempi
    let tempj
    for(let i = -1; i <= 1; i += 1){
        tempi = i
        for(let j = -1; j <= 1; j += 1)
        tempj = j
        if(x + tempi < 0 || y + tempj < 0 || x + tempi > tempArray.length || y + tempj > tempArray.length)
        {

        } else{
            for(let z = 0; z < arrowTypes.length; z += 1){
                // || x + tempi < 0 || y + tempj < 0 || y + tempj > 0
                if(x + tempi >= tempArray.length || x + tempi < 0 || y + tempj < 0 || y + tempj >= tempArray.length){
                    console.log('bad check!!!!','tempArray' + tempArray.length, x + tempi, y + tempj)
                }
                else {
                    if(arrowTypes[z] === tempArray[x + tempi][y + tempj]){
                        if(tempi != 0 && tempj != 0){
                            //tempArray[x + i][y + j] == false
                            tempArray[x + tempi][y + tempj] = false
                            sampler.triggerAttackRelease(["C2"], 0.5);
                            console.log('grab that note!')
                        //synth.triggerAttackRelease(C4, now);
                        }
                        
                    }
                }
                
            }
            
        }
        
    }
    
}



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
    const tempArrayAgents = arrayOfAgents
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
            
            //check agents first to adjust blocks before running the block cycle
            if(typeof tempArrayAgents[x][y] === 'string'){
                if(tempArrayAgents[x][y] === '⇈'){
                    tempChar = tempArrayAgents[x][y]
                    arrayOfAgents[x][y] = tempChar
                }
                if(tempArrayAgents[x][y] === '🐕'){
                    console.log('move dog')
                let tempChar = tempArrayAgents[x][y]
                console.log(tempChar)
                arrayOfAgents[x][y] = false
                //calculates random integer for direction of movement
                let moved = false
                let direction
                let numberOfChecks = 0
                while(moved !== true){
                    let tempDirection = Math.floor(Math.random()*8)
                    numberOfChecks ++
                    let check

                    
                    if(tempDirection == 0){
                        if(x + 1 >= arrayOfAgents.length){
                                    check = false
                            } else{
                                //console.log(tempDirection + " tempDirection", numberOfChecks + "the number of checks", x, y, arrayOfAgents[x + 1], arrayOfAgents[x + 2], arrayOfAgents)
                                if(tempArrayAgents[x + 1][y] == '⇈'){
                                    
                                    
                                    check = false
                                        console.log('prevented move because fence' + tempDirection)
                                        
                                    }
                                else if(tempArrayAgents[x + 1][y] == '🐕'){
                                    
                                    
                                    check = false
                                        console.log('prevented move because dog' + tempDirection)
                                        
                                    }
                                else if(arrayOfAgents[x + 1][y] == '🐕'){
                                    
                                    
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else{
                                    check = true
                                }
                            }
                        
                    } else if(tempDirection == 1){
                        if(x - 1 < 0){
                                     check = false
                            } else {
                                //console.log(tempDirection + " tempDirection", numberOfChecks + "the number of checks", tempArrayAgents[x - 1], y, tempArrayAgents[x-1][y])
                                if(tempArrayAgents[x - 1][y] == '⇈'){
                                    
                                    
                                    check = false
                                        console.log('prevented move because fence' + tempDirection)
                                        
                                    }
                                else if(tempArrayAgents[x - 1][y] == '🐕'){
                                            
                                            
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else if(arrayOfAgents[x - 1][y] == '🐕'){
                                            
                                            
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else{
                                    check = true
                                }
                            }
                        
                        
                    } else if(tempDirection == 2){
                        if(y + 1 >= arrayOfAgents.length){
                                check = false
                            } else {
                                //console.log(tempDirection + " tempDirection", numberOfChecks + "the number of checks", tempArrayAgents[x - 1], y, tempArrayAgents[x-1][y])
                                if(tempArrayAgents[x][y + 1] == '⇈'){
                                    
                                    
                                    check = false
                                        console.log('prevented move because fence' + tempDirection)
                                        
                                    }
                                else if(tempArrayAgents[x][y + 1] == '🐕'){
                                            
                                            
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else if(arrayOfAgents[x][y + 1] == '🐕'){
                                            
                                            
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else{
                                    check = true
                                }
                            }
                        
                    } else if(tempDirection == 3){
                        if(y - 1 < 0){
                            check = false
                        } else {
                                //console.log(tempDirection + " tempDirection", numberOfChecks + "the number of checks", tempArrayAgents[x - 1], y, tempArrayAgents[x-1][y])
                                if(tempArrayAgents[x][y - 1] == '⇈'){
                                    
                                    
                                    check = false
                                        console.log('prevented move because fence' + tempDirection)
                                        
                                    }
                                else if(tempArrayAgents[x][y - 1] == '🐕'){
                                            
                                            
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else if(arrayOfAgents[x][y - 1] == '🐕'){
                                            
                                            
                                    check = false
                                            console.log('prevented move because dog' + tempDirection)
                                            
                                    }
                                else{
                                    check = true
                                }
                            }
                        
                    } 
                    // else if(tempDirection == 3){
                    //     console.log(tempDirection + " tempDirection", numberOfChecks + "the number of checks", tempArrayAgents[x - 1], y, tempArrayAgents[x-1][y])
                    //     if(tempArrayAgents[x][y - 1] == '⇈'){
                            
                            
                    //         check = false
                    //             console.log('prevented move because fence' + tempDirection)
                                
                    //         }
                    //     else{
                    //         check = true
                    //     }
                        
                    // }

                    // if(tempDirection == 0){
                    //     if(x + 1 >= tempArrayAgents.length){
                    //         check = false
                    //     }else{
                    //         if(tempArrayAgents[x + 1][y] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(tempArrayAgents[x + 1][y] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                            
                    //     }
                    // } else if(tempDirection == 1){
                    //     //left
                    //     if(x - 1 < 0){
                    //         check = false
                    //     }else{
                    //         console.log('the check' + tempArrayAgents[x - 1][y])
                    //         if(tempArrayAgents[x - 1][y] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //             console.log()
                    //         }
                    //         if(tempArrayAgents[x - 1][y] == '🐕'){
                    //             check = false
                    //         } else {
                    //             //
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 2){
                    //     //up
                    //     if(y + 1 >= tempArrayAgents.length){
                    //         check = false
                    //     }else{
                    //         console.log(tempArrayAgents[x][y + 1])
                    //         if(tempArrayAgents[x][y + 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(tempArrayAgents[x][y + 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 3){
                    //     // down
                    //     if(y - 1 < 0){
                    //         check = false
                    //     }else{
                    //         console.log(tempArrayAgents[x][y - 1])
                    //         if(tempArrayAgents[x][y - 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(tempArrayAgents[x][y - 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 4){
                    //     // top left
                    //     if(x - 1 < 0 || y + 1 >= tempArrayAgents.length){
                    //         check = false
                    //     }else{
                    //         if(tempArrayAgents[x - 1][y + 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(tempArrayAgents[x - 1][y + 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 5){
                    //     // top right
                    //     if(x + 1 >= tempArrayAgents.length || y + 1 >= tempArrayAgents.length){
                    //         check = false
                    //     }else{
                    //         if(tempArrayAgents[x + 1][y + 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(tempArrayAgents[x + 1][y + 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 6){
                    //     //bottom left
                    //     if(x - 1 < 0 || y - 1 < 0){
                    //         check = false
                    //     }else{
                    //         if(tempArrayAgents[x - 1][y - 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(tempArrayAgents[x - 1][y - 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 7){
                    //     //bottom righ
                    //     if(x + 1 >= tempArrayAgents.length || y - 1 < 0){
                    //         check = false
                    //     }else{
                    //         if(tempArrayAgents[x + 1][y - 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         else if(tempArrayAgents[x + 1][y - 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = false
                    //         }
                    //     }
                    // }
                    if(check == true){
                            console.log('good move')
                            direction = tempDirection
                            break
                        }
                    
                    
                    // if(tempDirection == 0){
                    //     if(x + 1 >= arrayOfAgents.length){
                    //         check = false
                    //     }else{
                    //         if(arrayOfAgents[x + 1][y] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(arrayOfAgents[x + 1][y] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                            
                    //     }
                    // } else if(tempDirection == 1){
                    //     //left
                    //     if(x - 1 < 0){
                    //         check = false
                    //     }else{
                    //         console.log('the check' + arrayOfAgents[x - 1][y])
                    //         if(arrayOfAgents[x - 1][y] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //             console.log()
                    //         }
                    //         if(arrayOfAgents[x - 1][y] == '🐕'){
                    //             check = false
                    //         } else {
                    //             //
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 2){
                    //     //up
                    //     if(y + 1 >= arrayOfAgents.length){
                    //         check = false
                    //     }else{
                    //         console.log(arrayOfAgents[x][y + 1])
                    //         if(arrayOfAgents[x][y + 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(arrayOfAgents[x][y + 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 3){
                    //     // down
                    //     if(y - 1 < 0){
                    //         check = false
                    //     }else{
                    //         console.log(arrayOfAgents[x][y - 1])
                    //         if(arrayOfAgents[x][y - 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(arrayOfAgents[x][y - 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 4){
                    //     // top left
                    //     if(x - 1 < 0 || y + 1 >= arrayOfAgents.length){
                    //         check = false
                    //     }else{
                    //         if(arrayOfAgents[x - 1][y + 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(arrayOfAgents[x - 1][y + 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 5){
                    //     // top right
                    //     if(x + 1 >= arrayOfAgents.length || y + 1 >= arrayOfAgents.length){
                    //         check = false
                    //     }else{
                    //         if(arrayOfAgents[x + 1][y + 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(arrayOfAgents[x + 1][y + 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 6){
                    //     //bottom left
                    //     if(x - 1 < 0 || y - 1 < 0){
                    //         check = false
                    //     }else{
                    //         if(arrayOfAgents[x - 1][y - 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         if(arrayOfAgents[x - 1][y - 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = true
                    //         }
                    //     }
                    // } else if(tempDirection == 7){
                    //     //bottom righ
                    //     if(x + 1 >= arrayOfAgents.length || y - 1 < 0){
                    //         check = false
                    //     }else{
                    //         if(arrayOfAgents[x + 1][y - 1] == '⇈'){
                    //             check = false 
                    //             console.log('prevented move because fence' + tempDirection)
                    //         }
                    //         else if(arrayOfAgents[x + 1][y - 1] == '🐕'){
                    //             check = false
                    //         } else {
                                
                    //             check = false
                    //         }
                    //     }
                    // }
                    // if(check == true){
                    //     console.log('good move')
                    //     direction = tempDirection
                    //     break
                    // }
                    // else{
                    //     console.log('badmove')
                    // }
                    
                }
                dogGrabNote(tempArray,x,y)
                console.log('tempDire before', arrayOfAgents[x], arrayOfAgents[x+1],arrayOfAgents)

                if(direction == 0){
                    //right
                    arrayOfAgents[x + 1][y] = tempChar
                    console.log('tempDire after', arrayOfAgents)
                } else if(direction == 1){
                    //left
                    arrayOfAgents[x - 1][y] = tempChar
                } else if(direction == 2){
                    //up
                    arrayOfAgents[x][y + 1] = tempChar
                } else if(direction == 3){
                    // down
                    arrayOfAgents[x][y - 1] = tempChar
                } else if(direction == 4){
                    // top left
                    arrayOfAgents[x - 1][y + 1] = tempChar
                } else if(direction == 5){
                    // top right
                    arrayOfAgents[x + 1][y + 1] = tempChar
                } else if(direction == 6){
                    //bottom left
                    arrayOfAgents[x - 1][y - 1] = tempChar
                } else if(direction == 7){
                    //bottom righ
                    arrayOfAgents[x + 1][y - 1] = tempChar
                }
                
            }


            }
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
                    arrayOfBoxes[x][y - 1] = '↑'
                }
                if(tempArray[x][y] === '🡻'){
                    arrayOfBoxes[x][y] = '🡻'
                    arrayOfBoxes[x][y + 1] = '↓'
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

                //Spinner 
                //Acts as a redirector for the arrows

                for (let i = 0; i < spinnerTypes.length; i += 1){
                    if(tempArray[x][y] == spinnerTypes[i] && i + 1 < spinnerTypes.length){
                        arrayOfBoxes[x][y] = spinnerTypes[i + 1]
                    } else if(tempArray[x][y] == spinnerTypes[i]){
                        arrayOfBoxes[x][y] = spinnerTypes[0]
                    }
                }
               

                //Boids (dog?) 
                //Randomly moves and fetches notes

                
                //arrow notes
                if(tempArray[x][y] === '→'){
                        console.log('move flower')
                    let tempChar = tempArray[x][y]
                    console.log(tempChar)
                    arrayOfBoxes[x][y] = false
                    if((x + 1) == (tempArray.length - 1)){
                        const note = notes[(y % 11)]
                        
                        bongo.triggerAttackRelease(note + 2, 1);
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
                    trumpet.triggerAttackRelease(note + 2, 1);
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
                    bongo.triggerAttackRelease(note + 1, "8n");
                    //synth.triggerAttackRelease(note + 4, "8n");
                }
                if((y + 1) !== (tempArray.length)){
                    console.log('should continue')
                    arrayOfBoxes[x][y + 1] = tempChar
                }
            }

                if(tempArray[x][y] === '↑'){
                    
                let tempChar = tempArray[x][y]
                console.log(tempChar)
                arrayOfBoxes[x][y] = false
                if((y - 1) == -1){
                    const note = notes[(x % 11)]
                    polySynth.triggerAttackRelease(note + 4, "8n");
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
    //console.log(arrayOfBoxes)
    drawRectangles()

}


//controls

//click on canvas to add a box
canvas.addEventListener("click", (e) => {
    
    const canvasDIM = canvas.getBoundingClientRect()
    //gets box location and gets grid index location
    const x = Math.floor((e.clientX - canvasDIM.left)/20)
    const y = Math.floor((e.clientY - canvasDIM.top)/20)

    if(typeof arrayOfBoxes[x][y] == "string" && typeof arrayOfAgents[x][y] !== "string" && currentBlock === '🐕' || currentBlock === '⇈'){
        console.log('attatched dog on top',)
        arrayOfAgents[x][y] = currentBlock
    }else if(typeof arrayOfAgents[x][y] == "string"){
        arrayOfAgents[x][y] = false
    }else if(typeof arrayOfBoxes[x][y] == "string"){
        arrayOfBoxes[x][y] = false
    }else{
        if(currentBlock === '🐕' || currentBlock === '⇈'){
            console.log('placed dog! or fence')
            arrayOfAgents[x][y] = currentBlock
        }else{
            arrayOfBoxes[x][y] = currentBlock
        }
        
    }

    if(currentBlock === '🐕'){}
    let tempArray = [arrayOfBoxes,arrayOfAgents]
    clearGrid()
    arrayOfBoxes = tempArray[0]
    arrayOfAgents = tempArray[1]
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