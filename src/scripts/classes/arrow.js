const arrowTypes = ['←','→','↑','↓','↖','↗','↘','↙']

const arrowStateSpace = [
    []
]
function getArrowfromDegrees(degrees){
    switch(degrees) {
        case 0: return '→'
        break
        case 45: return '↗'
        break
        case 90: return '↑'
        break
        case 135: return '↖'
        break
        case 180: return '←'
        break
        case -135: return '↙'
        break
        case -90: return '↓'
        break
        case -45: return '↘'
        break
    }
}

function getCoordinates(arrow){
    switch(arrow) {
        case '→': return [1,0]
        break
        case '↗': return [Math.sqrt(2)/2,Math.sqrt(2)/2]
        break
        case '↑': return [0,1]
        break
        case '↖': return [-Math.sqrt(2)/2,Math.sqrt(2)/2]
        break
        case '←': return [-1,0]
        break
        case '↙': return [-(Math.sqrt(2)/2),-Math.sqrt(2)/2]
        break
        case '↓': return [0,-1]
        break
        case '↘': return [Math.sqrt(2)/2,-Math.sqrt(2)/2]
        break
        case false: return false
        break
    }
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}  
function determineArrowAangle(arrow, arrowToCheck){
    if(arrowToCheck == false){
        return arrow
    }

    let arrow1 = {
        x: getCoordinates(arrow)[0],
        y: getCoordinates(arrow)[1],
        magnitude: Math.sqrt((getCoordinates(arrow)[0]*getCoordinates(arrow)[0])+(getCoordinates(arrow)[1]*getCoordinates(arrow)[1]))
    }
    let arrow2 = {
        x: getCoordinates(arrowToCheck)[0],
        y: getCoordinates(arrowToCheck)[1],
        magnitude: Math.sqrt((getCoordinates(arrowToCheck)[0]*getCoordinates(arrowToCheck)[0])+(getCoordinates(arrowToCheck)[1]*getCoordinates(arrowToCheck)[1]))
    }
    let midpoint = {
        x: ((arrow1.x + arrow2.x)/2),
        y: ((arrow1.y + arrow2.y)/2)
    }
    //Math.sqrt(Math.pow((arrow2.x-arrow1.x),2) + Math.pow((arrow2.y-arrow1.y),2))
    // let angleBetween = Math.acos((arrow1.x * arrow2.x) + (arrow1.y * arrow2.y)/(arrow1.magnitude*arrow2.magnitude))
    
    
    if(midpoint.x == 0 && midpoint.y == 0){
        return false
    }else{
        //console.log(midpoint,(Math.PI/2))


        if(midpoint.y < 0){
            return radians_to_degrees((-Math.PI/2) - Math.atan(midpoint.y/midpoint.x))
        } 
        else if(midpoint.x > 0){
            return radians_to_degrees(Math.atan(midpoint.y/midpoint.x))
        }
        else if(midpoint.y > 0){
            return radians_to_degrees((Math.PI/2) - Math.atan(midpoint.y/midpoint.x))
        }
        else if(midpoint.y == 0 && midpoint.x < 0){
            return 180
        }
        console.log(midpoint.x,midpoint.y)
        
    }


    //console.log(Math.atan(midpoint.y/midpoint.x),radians_to_degrees(Math.atan(midpoint.y/midpoint.x)))
    //return angleBetween
    
    
}
function determineArrowDirection(arrow, arrowToCheck) {
    let angle = determineArrowAangle(arrow,arrowToCheck)
    return getArrowfromDegrees(angle)

}

console.log(determineArrowDirection('→','↑'))

// function checkArrowInteraction(arrow, arrowToCheck) {
//     switch(arrow) {
//         case '←':
//             switch(arrowToCheck) {
//                 case '→': return false 
//                 break
//                 case '←': return arrow
//                 break
//                 case '↑': return '↖'
//                 break
//                 case '↓': return '↙'
//                 break
//                 case '↖': return '↙'
//                 break
//                 case '↗': return '↖'
//                 break
//                 case '↘': return '↙'
//                 break
//                 case '↙': return '↙'
//                 break
//                 default:  return '←'
//                 break
//             }
//             break
        
//         case '→':
//             switch(arrowToCheck) {
//                 case '→': return arrow
//                 break
//                 case '←': return false
//                 break
//                 case '↑': return '↗'
//                 break
//                 case '↓': return '↘'
//                 break
//                 case '↖': return '↗'
//                 break
//                 case '↗': return '→'
//                 break
//                 case '↘': return '→'
//                 break
//                 case '↙': return '↘'
//                 break
//                 default:  return arrow
//                 break
//             }
//             break
            
//     }
// }

export default determineArrowDirection