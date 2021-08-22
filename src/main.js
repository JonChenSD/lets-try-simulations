import "./main.css";
import { player } from "./scripts/classes/player.js"
import determineArrowDirection from './scripts/classes/arrow.js'

//ascii list

const arrowTypes = ['←','→','↑','↓','↖','↗','↘','↙']
const spinnerTypes = ['│','⟋','―','⟍']
const agentTypes = ['🐕','🦌','🐂']
const obstacleTypes = ['🐕','🦌','🐂','⇈']
const actionBlocksTypes = ['⇦','⇧','⇨','⇩','⇐','⇑','⇒','⇓']

//button
let closeAbout = document.getElementById("closeAbout")
console.log(closeAbout)
let aboutModal = document.getElementById("aboutModal")
let aboutButton = document.getElementById("aboutButton")

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
                if(actionBlocksTypes.includes(arrayOfBoxes[x/boxWH][y/boxWH])){
                    boxFilled = true
                   
                    context.font = ' 32px monospace'
                    
                    
                    if(arrayOfBoxes[x/boxWH][y/boxWH] !== false){
                        //console.log(arrayOfBoxes[x/boxWH][y/boxWH])
                    }
                    context.fillStyle = "#ff9419"
                    context.fillText('■', (x+1), (y +19), boxWH)
                    context.font = ' 24px monospace'
                    
                    context.fillStyle = "white"
                    context.fillText(arrayOfBoxes[x/boxWH][y/boxWH], x, (y +18), boxWH)
                    
                    
                }
                else
                {
                    boxFilled = true
                    context.font = ' 24px monospace'
                    
                    context.fillStyle = "yellow"
                    if(arrayOfBoxes[x/boxWH][y/boxWH] !== false){
                        //console.log(arrayOfBoxes[x/boxWH][y/boxWH])
                    }
                    context.fillText(arrayOfBoxes[x/boxWH][y/boxWH], x, (y +18), boxWH)
                }
                
            }

            //same drawing proccess but for agents
            if(typeof arrayOfAgents[x/boxWH][y/boxWH] == "string"){
                
                context.font = ' 16px sans-serif'
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


function agentCheckSpace(tempArray,agent,x,y,adjustX,adjustY){
    let tempi
    let tempj
    if(actionBlocksTypes.includes(tempArray[x][y]) && agent == '🐂'){
        let tempBlock = tempArray[x][y]
        console.log('kangaroo',adjustX,adjustY,tempBlock)
        tempArray[x][y] = false
        tempArray[x + adjustX][y + adjustY] = tempBlock
        console.log('kangaroo effect',tempArray[x + adjustX][y + adjustY])
    }
    for(let i = -1; i <= 1; i += 1){
        tempi = i
        for(let j = -1; j <= 1; j += 1)
        tempj = j
        
            
            
                
            
        
        if(agent != '🐂')
        {
                
                if(arrowTypes.includes(tempArray[x + tempi][y + tempj])){
                    if(tempi != 0 && tempj != 0){
                        //tempArray[x + i][y + j] == false
                        tempArray[x + tempi][y + tempj] = false
                        if(agent == '🐕'){
                            player.play('dog')
                        }
                            
                        console.log('grab that note!')
                        //synth.triggerAttackRelease(C4, now);
                    }
            }
            
        }
        
    }
    
}

// for(let i = -1; i <= 1; i++){
//     for(let j = -1; j <= 1; j++)
// }

//runs through one cycle of the game 
console.log('updating code')
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
                let currentAgent = tempArrayAgents[x][y]
                if(currentAgent === '⇈'){
                    tempChar = currentAgent
                    arrayOfAgents[x][y] = tempChar
                }
                if(currentAgent == '🦌'){
                    console.log('FOUND LAMA')
                }
                if(currentAgent == '🐕'){
                    console.log('FOUND LAMA')
                }
                if(agentTypes.includes(currentAgent)){
                    console.log('move dog')
                let tempChar = currentAgent
                console.log(tempChar)
                arrayOfAgents[x][y] = false
                //calculates random integer for direction of movement
                let moved = false
                let direction
                let numberOfChecks = 0

                    //
                    

                    //

                while(moved !== true){
                    let tempDirection = Math.floor(Math.random()*8)
                    numberOfChecks ++
                    let check
                    //some lookup, lookup function
                    if(tempDirection == 0){
                        if(x + 1 >= arrayOfAgents.length){
                                    check = false
                            } else{
                                let notChecked = false
                                    for(let i = 0; i < obstacleTypes.length; i++){
                                        if(tempArrayAgents[x + 1][y] == obstacleTypes[i]){
                                            check = false
                                        }
                                    }
                                    if(check == undefined){
                                        check = true
                                    }
                                }
                    }
                    
                    else if(tempDirection == 1){
                        if(x - 1 < 0){
                            check = false
                        } 
                        else{
                            for(let i = 0; i < obstacleTypes.length; i++){
                                if(tempArrayAgents[x - 1][y] == obstacleTypes[i]){
                                    check = false
                                }
                            }
                            if(check == undefined){
                                check = true
                            }
                        }
                    }
                    else if(tempDirection == 2){
                        if(y + 1 >= arrayOfAgents.length){
                            check = false
                        } 
                        else{
                            for(let i = 0; i < obstacleTypes.length; i++){
                                if(tempArrayAgents[x][y + 1] == obstacleTypes[i]){
                                    check = false
                                }
                            }
                            if(check == undefined){
                                check = true
                            }
                        }
                    }
                    else if(tempDirection == 3){
                        if(y - 1 < 0){
                            check = false
                        } 
                        else{
                            for(let i = 0; i < obstacleTypes.length; i++){
                                if(tempArrayAgents[x][y - 1] == obstacleTypes[i]){
                                    check = false
                                }
                            }
                            if(check == undefined){
                                check = true
                            }
                        }
                    }
                    
                    
                    if(check == true){
                            console.log('good move')
                            direction = tempDirection
                            break
                        }
                    
                    
                    
                }
                let adjustX = 0
                let adjustY = 0

                if(direction == 0){
                    //right
                    arrayOfAgents[x + 1][y] = tempChar
                    adjustX = 1
                    console.log('tempDire after', arrayOfAgents)
                } else if(direction == 1){
                    //left
                    arrayOfAgents[x - 1][y] = tempChar
                    adjustX = -1
                } else if(direction == 2){
                    //up
                    arrayOfAgents[x][y + 1] = tempChar
                    adjustY = 1
                } else if(direction == 3){
                    // down
                    arrayOfAgents[x][y - 1] = tempChar
                    adjustY = -1
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

                agentCheckSpace(tempArray,currentAgent,x,y,adjustX,adjustY)
                console.log('tempDire before', arrayOfAgents[x], arrayOfAgents[x+1],arrayOfAgents)

                
                
            }


            }
            if(typeof tempArray[x][y] === 'string'){
                //block generators
                //⇦ ⇨ ⇧ ⇩  ⇐ ⇒ ⇑ ⇓ 
                if(tempArray[x][y] === '⇦'){
                    arrayOfBoxes[x][y] = '⇦'
                    if( interval % 2 == 0){
                        arrayOfBoxes[x - 1][y] = '←'
                    }
                }
                if(tempArray[x][y] === '⇨'){
                    arrayOfBoxes[x][y] = '⇨'
                    if( interval % 2 == 0){
                        arrayOfBoxes[x + 1][y] = '→'
                    }
                    
                }
                if(tempArray[x][y] === '⇧'){
                    arrayOfBoxes[x][y] = '⇧'
                    if( interval % 2 == 0){
                        arrayOfBoxes[x][y - 1] = '↑'
                    }
                }
                if(tempArray[x][y] === '⇩'){
                    arrayOfBoxes[x][y] = '⇩'
                    if( interval % 2 == 0){
                        arrayOfBoxes[x][y + 1] = '↓'
                    }
                }
                if(tempArray[x][y] === '⇐'){
                    arrayOfBoxes[x][y] = '⇐'
                    if( interval == 0){
                        arrayOfBoxes[x - 1][y] = '←'
                    }
                    
                }
                if(tempArray[x][y] === '⇒'){
                    arrayOfBoxes[x][y] = '⇒'
                    if( interval == 0){
                        arrayOfBoxes[x + 1][y] = '→'
                    }
                    
                }
                if(tempArray[x][y] === '⇑'){
                    arrayOfBoxes[x][y] = '⇑'
                    if( interval == 0){
                        arrayOfBoxes[x][y - 1] = '↑'
                    }
                    
                }
                if(tempArray[x][y] === '⇓'){
                    arrayOfBoxes[x][y] = '⇓'
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
                let tempArrow = false
                let arrowToCheck

                if(arrowTypes.includes(tempArray[x][y])){
                    tempArrow = tempArray[x][y]
                    console.log('temparrow found ')
                }
                else{
                    console.log('nothing found')
                }

                switch( tempArrow ) {
                    case '↗':
                        if((x + 1) == (tempArray.length - 1)){
                            player.play('trumpet', x, y)
                            //synth.triggerAttackRelease(note + 4, "8n");
                        }
                        else if((y - 1) == -1){
                            player.play('bongo', x, y)
                        }
                        else {
                            if(arrayOfBoxes[x + 1][y - 1] != false){
                                arrayOfBoxes[x + 1][y - 1] = determineArrowDirection(tempArrow,arrayOfBoxes[x + 1][y - 1])
                            }else{
                                arrayOfBoxes[x + 1][y - 1] = tempArrow
                            }
                                    
                        }
                        break
                    case '↖':
                        arrayOfBoxes[x][y] = false
                        if((x - 1) == -1){
                            player.play('trumpet', x, y)
                            //synth.triggerAttackRelease(note + 4, "8n");
                        }
                        else if((y - 1) == -1){
                            player.play('bongo', x, y)
                        }
                        else {
                            if(arrayOfBoxes[x - 1][y - 1] != false){
                                arrayOfBoxes[x - 1][y - 1] = determineArrowDirection(tempArrow,arrayOfBoxes[x - 1][y - 1])
                            }else{
                                arrayOfBoxes[x - 1][y - 1] = tempArrow
                            }
                                    
                        }
                        break
                    case '←':
                        arrayOfBoxes[x][y] = false
                        if((x - 1) == -1){
                            player.play('trumpet', x, y)
                            //synth.triggerAttackRelease(note + 4, "8n");
                        }
                        else {
                            if(arrayOfBoxes[x - 1][y] != false){
                                console.log(determineArrowDirection('↑','→'))
                                arrayOfBoxes[x - 1][y] = determineArrowDirection(tempArrow,arrayOfBoxes[x - 1][y])
                            }else{
                                arrayOfBoxes[x - 1][y] = tempArrow
                            }
                                    
                        }
                        break
                    case '→':
                        arrayOfBoxes[x][y] = false
                        if((x + 1) == (tempArray.length - 1)){
                            player.play('bongo', x, y)
                        }
                        else{
                            if(arrayOfBoxes[x + 1][y] != false){
                                console.log(determineArrowDirection('↑','→'))
                                arrayOfBoxes[x + 1][y] = determineArrowDirection(tempArrow,arrayOfBoxes[x + 1][y])
                            }else{
                                arrayOfBoxes[x + 1][y] = tempArrow
                            }
                            
                        }
                        break
                    case '↓':
                        arrayOfBoxes[x][y] = false
                        if((y + 1) == (tempArray.length - 1)){
                            player.play('bongo', x, y)
                        }
                        else{
                            if(arrayOfBoxes[x][y + 1] != false){
                                console.log('found hit!', tempArrow, arrayOfBoxes[x][y + 1], determineArrowDirection(tempArrow,arrayOfBoxes[y - 1][y]))
                                console.log(determineArrowDirection('↑','→'))
                                arrayOfBoxes[x][y + 1] = determineArrowDirection(tempArrow,arrayOfBoxes[x][y + 1])
                            }
                            else{
                                arrayOfBoxes[x][y + 1] = tempArrow
                            }
                        }
                        break
                    case '↑':
                        arrayOfBoxes[x][y] = false
                        if((y - 1) == -1){
                            player.play('kalimba', x, y)
                        }
                        else{
                            if(arrayOfBoxes[x][y - 1] != false){
                                console.log('found hit!', tempArrow, arrayOfBoxes[x][y - 1], determineArrowDirection(tempArrow,arrayOfBoxes[y - 1][y]))
                                console.log(determineArrowDirection('↑','→'))
                                arrayOfBoxes[x][y - 1] = determineArrowDirection(tempArrow,arrayOfBoxes[x][y - 1])
                            }
                            else{
                                arrayOfBoxes[x][y - 1] = tempArrow
                            }
                            
                        }
                        break
                    default:
                        console.log('nothing')

                }

                
                // if(tempArray[x][y] === '→'){
                //         console.log('move flower')
                //     let tempChar = tempArray[x][y]
                //     console.log(tempChar)
                //     arrayOfBoxes[x][y] = false
                //     if((x + 1) == (tempArray.length - 1)){
                //         const note = notes[(y % 11)]
                        
                //         bongo.triggerAttackRelease(note + 2, 1);
                //         //synth.triggerAttackRelease(note + 4, "8n");
                //     }
                //     else if((x + 1) !== (tempArray.length)){
                //         console.log('should continue')
                //         arrayOfBoxes[x + 1][y] = tempChar
                //     }
                // }
                // if(tempArray[x][y] === '←'){
                //     console.log('move flower')
                //     let tempChar = tempArray[x][y]
                //     console.log(tempChar)
                //     arrayOfBoxes[x][y] = false
                //     if((x - 1) == -1){
                //         const note = notes[(y % 11)]
                //         trumpet.triggerAttackRelease(note + 2, 1);
                //         //synth.triggerAttackRelease(note + 4, "8n");
                //     }
                //     if((x - 1) !== -1){
                //         console.log('should continue')
                //         arrayOfBoxes[x - 1][y] = tempChar
                //     }
            // }
            //     if(tempArray[x][y] === '↓'){
            //         console.log('move flower')
            //     let tempChar = tempArray[x][y]
            //     console.log(tempChar)
            //     arrayOfBoxes[x][y] = false
            //     if((y + 1) == (tempArray.length - 1)){
            //         const note = notes[(x % 11)]
            //         bongo.triggerAttackRelease(note + 1, "8n");
            //         //synth.triggerAttackRelease(note + 4, "8n");
            //     }
            //     if((y + 1) !== (tempArray.length)){
            //         console.log('should continue')
            //         arrayOfBoxes[x][y + 1] = tempChar
            //     }
            // }

            //     if(tempArray[x][y] === '↑'){
                    
            //     let tempChar = tempArray[x][y]
            //     console.log(tempChar)
            //     arrayOfBoxes[x][y] = false
            //     if((y - 1) == -1){
            //         const note = notes[(x % 11)]
            //         polySynth.triggerAttackRelease(note + 4, "8n");
            //         //synth.triggerAttackRelease(note + 4, "8n");
            //     }
            //     if((y - 1) !== -1){
            //         console.log('should continue')
            //         arrayOfBoxes[x][y - 1] = tempChar
            //     }
            // }
                
                
            }
            
           
        }
    }
    //console.log(arrayOfBoxes)
    drawRectangles()

}


//controls

//click on canvas to add a box
let mousedown = false

canvas.addEventListener("mousedown", (e) => {
    mousedown = true
   
})
let mouseCoordinate = [false,false]
canvas.addEventListener("mousemove", (e) => {
    
    if(mousedown == true){
        const canvasDIM = canvas.getBoundingClientRect()
        //gets box location and gets grid index location
        const x = Math.floor((e.clientX - canvasDIM.left)/20)
        const y = Math.floor((e.clientY - canvasDIM.top)/20)
        if(mouseCoordinate[0] != x || mouseCoordinate[1] != y){
            mouseCoordinate[0] = x
            mouseCoordinate[1] = y
            if(typeof arrayOfBoxes[x][y] == "string" && typeof arrayOfAgents[x][y] !== "string" && obstacleTypes.includes(currentBlock)){
                console.log('attatched dog on top',)
                arrayOfAgents[x][y] = currentBlock
            }else if(typeof arrayOfAgents[x][y] == "string"){
                arrayOfAgents[x][y] = false
            }else if(typeof arrayOfBoxes[x][y] == "string"){
                arrayOfBoxes[x][y] = false
            }else{
                if(obstacleTypes.includes(currentBlock)){
                    console.log('placed dog! or fence')
                    arrayOfAgents[x][y] = currentBlock
                }else{
                    arrayOfBoxes[x][y] = currentBlock
                }
        }

        
            
    }

    if(agentTypes.includes(currentBlock)){}
    let tempArray = [arrayOfBoxes,arrayOfAgents]
    clearGrid()
    arrayOfBoxes = tempArray[0]
    arrayOfAgents = tempArray[1]
    drawRectangles()
    console.log(x,y)
    console.log(arrayOfBoxes[x])
    }
    
})

canvas.addEventListener("mouseup", (e) => {
    const canvasDIM = canvas.getBoundingClientRect()
    //gets box location and gets grid index location
    const x = Math.floor((e.clientX - canvasDIM.left)/20)
    const y = Math.floor((e.clientY - canvasDIM.top)/20)

    if(typeof arrayOfBoxes[x][y] == "string" && typeof arrayOfAgents[x][y] !== "string" && obstacleTypes.includes(currentBlock)){
        console.log('attatched dog on top',)
        arrayOfAgents[x][y] = currentBlock
    }else if(typeof arrayOfAgents[x][y] == "string"){
        arrayOfAgents[x][y] = false
    }else if(typeof arrayOfBoxes[x][y] == "string"){
        arrayOfBoxes[x][y] = false
    }else{
        if(obstacleTypes.includes(currentBlock)){
            console.log('placed dog! or fence')
            arrayOfAgents[x][y] = currentBlock
        }else{
            arrayOfBoxes[x][y] = currentBlock
        }
        
    }

    if(agentTypes.includes(currentBlock)){}
    let tempArray = [arrayOfBoxes,arrayOfAgents]
    clearGrid()
    arrayOfBoxes = tempArray[0]
    arrayOfAgents = tempArray[1]
    drawRectangles()
    console.log(x,y)
    console.log(arrayOfBoxes[x])
    mousedown = false
   
})



//Button commands
closeAbout.addEventListener("click", (e) => {
    console.log('closed')
    aboutModal.style.display = "none"
})
aboutButton.addEventListener("click", (e) => {
    console.log('closed')
    if(aboutModal.style.display == "block"){
        aboutModal.style.display = "none"
    } else{
        aboutModal.style.display = "block"
    }
    
})

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

player.init()