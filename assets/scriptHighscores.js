let highScoresArr = []
let scoreListEl= document.getElementById("scorelist");
let clearButton= document.getElementById("clear");

// Logic for highscores page

const backButton= document.getElementById("back");

// backButton.addEventListener("click", function(event) {
//     event.preventDefault();
// }); 


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


// function addHighScore() {
//     let storedHighScores= JSON.parse(localStorage.getItem("storedHighScores")); 
//     if (storedHighScores=== null) {
//         storedHighScores = [];
//     } else {
//         let currentLength = highScoresArr.length; 
//         for (i=0 ; i < currentLength; i++) {
//             let initialsValue = storedHighScores[i].initials; 
//             let scoreValue = storedHighScores[i].score; 
//         }
        
        
//     }


    // console.log(storedHighScores); 
    // let initialsValue= localStorage.getItem("initials");
    // let scoreValue= localStorage.getItem("score");
    // currentIndex = highScoresArr.length; 
 
    // highScoresArr.push({initials: initialsValue, score: scoreValue});
    //  console.log(highScoresArr); 
 

 


function populateHighScore () {
    // addHighScore();
  
    // if (storedHighScores=== null) {
    //     storedHighScores = [];
    // } else {
        let currentLength = storedHighScores.length; 
        for (i=0 ; i < currentLength; i++) {
            // let initialsValue = storedHighScores[i].initials; 
            // let scoreValue = storedHighScores[i].score; 

            let newScore= document.createElement("li");
            newScore.setAttribute("class", "bg-warning text-dark p-2 w-75 my-2");
            newScore.textContent= ""+storedHighScores[i].initals+" - "+storedHighScores[i].score;
            // currentIndex++
            scoreListEl.appendChild(newScore); 
        }
        
        
    }

    

