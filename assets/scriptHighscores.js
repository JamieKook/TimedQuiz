
let scoreListEl= document.getElementById("scorelist");
let clearButton= document.getElementById("clear");

const backButton= document.getElementById("back");


backButton.addEventListener("click", redirect); 

function redirect(){
    window.location.href="index.html"; 
}


clearButton.addEventListener("click", function(event) {
    event.preventDefault();
})

let storedHighScores= JSON.parse(localStorage.getItem("storedHighScores")); 

function clearButtonFxn() {
    while (scoreListEl.hasChildNodes()) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
    storedHighScores= [];
    localStorage.setItem("storedHighScores", JSON.stringify(storedHighScores)); 
    
}

clearButton.addEventListener("click", clearButtonFxn); 



function populateHighScore () {
  
    let largestScore; 
    let highScores = []; 
    let scoreArr = [];
    let numberOfHighScores= 0; 
    let currentLength = storedHighScores.length; 
    for (let i=0 ; i < currentLength; i++) {
        scoreArr.push(storedHighScores[i].score); 
    }
    console.log(scoreArr); 
    
   
    
    while (numberOfHighScores < 5 && numberOfHighScores < storedHighScores.length) {
        largestScore= Math.max(...scoreArr); 
        console.log(largestScore); 
        for (let i=0 ; i < currentLength; i++) {
            if (storedHighScores[i].score === largestScore && numberOfHighScores < 5) {
                highScores.push(storedHighScores[i])
                let spliceIndex= scoreArr.indexOf(largestScore); 
                scoreArr.splice(spliceIndex,1); 
                console.log(scoreArr); 
                console.log(highScores); 
                numberOfHighScores++; 
            } 
        } 
    }
  
    for (let i=0 ; i < highScores.length; i++) {
        let newScore= document.createElement("li");
        newScore.setAttribute("class", "bg-warning text-dark m-auto p-2 w-75 my-2");
        newScore.textContent= ""+highScores[i].initals+" - "+highScores[i].score +", "+ highScores[i].quizType +" quiz";
        scoreListEl.appendChild(newScore); 
    }
}; 
    
        
    
    // function populateHighScore () {
    //     let scoreArr = [];
    //     let currentLength = storedHighScores.length; 
    //     for (i=0 ; i < currentLength; i++) {
    
    //         scoreArr.push(storedHighScores[i].score);
    //         console.log(scoreArr); 
    
    //         let newScore= document.createElement("li");
    //         newScore.setAttribute("class", "bg-warning text-dark m-auto p-2 w-75 my-2");
    //         newScore.textContent= ""+storedHighScores[i].initals+" - "+storedHighScores[i].score;
    //         scoreListEl.appendChild(newScore); 
    //     }
        
            
    //     }
    

