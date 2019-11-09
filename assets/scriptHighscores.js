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



function clearButtonFxn() {
    while (scoreListEl.hasChildNodes()) {
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
}

clearButton.addEventListener("click", clearButtonFxn); 


function addHighScore() {
    let initialsValue= localStorage.getItem("initials");
    let scoreValue= localStorage.getItem("score");
    currentIndex = highScoresArr.length; 
 
    highScoresArr.push({initials: initialsValue, score: scoreValue});
     console.log(highScoresArr); 
 
 }
 
 

function populateHighScore () {
    addHighScore();
    
    let newScore= document.createElement("li");
    newScore.setAttribute("class", "bg-warning text-dark p-2 w-75");
    newScore.textContent= ""+highScoresArr[currentIndex].initials+" - "+highScoresArr[currentIndex].score;
    currentIndex++
    scoreListEl.appendChild(newScore); 
}
