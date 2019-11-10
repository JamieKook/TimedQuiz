
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

        let currentLength = storedHighScores.length; 
        for (i=0 ; i < currentLength; i++) {

            let newScore= document.createElement("li");
            newScore.setAttribute("class", "bg-warning text-dark m-auto p-2 w-75 my-2");
            newScore.textContent= ""+storedHighScores[i].initals+" - "+storedHighScores[i].score;
            scoreListEl.appendChild(newScore); 
        }
        
        
    }

    

