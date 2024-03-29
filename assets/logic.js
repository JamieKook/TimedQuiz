//Global variables



const timeOnPage= document.getElementById("timer")
let time= 75;
let isTimeStop= false; 

const main= document.getElementById("main");
let questionNum=0;

 

let scoreListEl= document.getElementById("scorelist");
let clearButton= document.getElementById("clear");

let quizSelected; 

//Clicking start button
document.getElementById("start").addEventListener("click", function(){
    if (isSelected) {
        countDown(); 
        clearMain();
        generateQuestion();
    } else {
        alert("You need to select a quiz from the dropdown menu!"); 
    }
     

});


//Functions invovling the timer
function countDown(){

    let timer= setInterval(function(){
       timeOnPage.textContent= "Time: "+ time + "s";
       if (time <= 0 || isTimeStop) {
            clearInterval(timer);
            timeOnPage.textContent= "Time: "; 
           if (time <= 0) {
            youLose(); 
            }
        }
        time--;
    }, 1000)
}

function resetCountDown(){
    console.log(time);
    time -= 10;
    console.log(time);
    timeOnPage.textContent= "Time: "+ time + "s";

}




//Quiz question bank and selection of quiz


const animalQuestions=[
    {
        title: "Which animal leaps out of the water to communicate with others of its kind?",
        choices: ["Flying fish", "Tadpole", "Whale"],
        answer: "Whale"
    },
    {
        title: 'Which baby animal is known as a "cygnet?"',
        choices: ["Elephant", "Swan", "Rabbit"],
        answer: "Swan"
    },
    {
        title: 'Which of these land animals moves most slowly?',
        choices: ["Snail", "Turtle", "Threetoed sloth"],
        answer: "Snail"
    },
    {
        title: 'Which bear has a baby that weighs less than an apple?',
        choices: ["Grizzly", "Polar", "Panda"],
        answer: "Panda"
    },
    {
        title: 'Which animal used to roam in huge herds across the American West?',
        choices: ["American buffalo", "Elk", "Prairie Dog"],
        answer: "American buffalo"
    }
]; 

const historyQuestions = [
    {
        title: "Through which national park does the Continental Divide not pass?",
        choices:["Rocky mountain", "Glaicer", "Yosemite"],
        answer: "Yosemite"
    },
    {
        title: "On what peninsula in Washington would you find the Olympic Mountains?",
        choices: ["Olympic", "Washington", "Seatle"],
        answer: "Olympic"
    },
    {
        title: "Who was the first U.S. president to appear on television?",
        choices: ["Fanklin Delano Roosevelt", "Abraham Lincoln", "Richard Nixon"], 
        answer: "Fanklin Delano Roosevelt"
    },
    {
        title: "What automobile was named after Henry Ford’s only son?", 
        choices: ["Buick", "Edsel", "Isuzu"],
        answer: "Edsel"
    },
    {
        title: "In what American state would you find Denali?",
        choices: ["Alaska", "Arkansas", "Arizona"], 
        answer: "Alaska"
    }
]; 

function quizSelect(event) {
   
    console.log(event); 

    if (event.target.getAttribute("id")==="dropmenu"){
        isSelected=false; 
        return; 
    }
    quizSelected= event.target.getAttribute("id"); 
    quizName.textContent= "You've selected the " + quizSelected +" quiz!"
    switch (quizSelected) {
        case "Animal":
            questions= animalQuestions; 
            console.log(animalQuestions); 
            break;
        case "History": 
            questions= historyQuestions; 
    }
    isSelected= true; 
}

//Functions for quiz selection

document.getElementById("dropmenu").addEventListener("click", quizSelect); 


let quizName= document.createElement("h3");
quizName.textContent= "You need to select a quiz!"
let startButton = document.getElementById("start"); 
main.insertBefore(quizName, startButton); 
let isSelected= false; 
let questions;


//Clear html on page in container Main

function clearMain(){
    while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
    }

}



//audio files... I know I could figure out a more concise way to do this if I wanted but...
function correctPlay(){
    var audio = document.getElementById("audio");
    audio.play();
}

function incorrectPlay(){
    var audio = document.getElementById("incorrectaudio");
    audio.play();
}

function gameOverPlay(){
    var audio = document.getElementById("gameoveraudio");
    audio.play();
}

// Correct/Incorrect Answer Response on page- *Put on top of answer because I like it better there
function congrats(){

    clearMain();

    let divider = document.createElement("div");
    divider.setAttribute("class","container text-center");
    main.insertBefore(divider, main.children[0]); 
    let lineDivide = document.createElement("hr");
    let congMessage = document.createElement("h5");
    congMessage.textContent = "Correct!";
    congMessage.setAttribute("class", "p-2 m-2");
    
    divider.appendChild(congMessage);
    divider.appendChild(lineDivide);
    correctPlay(); 

    
  
}

function wrong(){

    clearMain();

    let divider = document.createElement("div");
    divider.setAttribute("class","container text-center");
    main.insertBefore(divider, main.children[0]);
    let lineDivide = document.createElement("hr");
    let wrongMessage = document.createElement("h5");
    wrongMessage.textContent = "Wrong. You just lost 10 seconds!";
    wrongMessage.setAttribute("class", "p-2 m-2 text-center");
    
    divider.appendChild(wrongMessage);
    divider.appendChild(lineDivide);
    //time penalty for wrong answer
    resetCountDown();
    incorrectPlay(); 

}

// function to create new quiz questions on click

function generateQuestion(){

 
    //format main section 
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 text-center");

  
    //populate question
    questionsTitle= document.createElement("h4");
    questionsTitle.textContent= questions[questionNum].title
    questionsTitle.setAttribute("class", "p-4 mb-4 m-2 col-12");

    main.appendChild(questionsTitle);
    
    // populate answer choices
    for (let i=0; i < 3; i++) {
        let questionAnswer =  document.createElement("button");
        questionAnswer.textContent= questions[questionNum].choices[i];
        questionAnswer.setAttribute("class", "answerChoice btn btn-primary col-12 col-lg-3 my-2 m-lg-auto p-2");
        questionAnswer.setAttribute("id", "question:"+questionNum + " answer:"+i);

        //function that gives answer choices event listeners to determine which message to populate on next html page
        function correctAnswer (){
            if (questions[questionNum].choices[i]=== questions[questionNum].answer){
                
                questionAnswer.addEventListener("click", congrats);

            } else {
                questionAnswer.addEventListener("click", wrong);
               
            }
        }

        //calls function to add event listeners for right/wrong
        correctAnswer();

        //give answer choices event listeners to determine whether another question shows or if its the last screen 
        if (questionNum !== (questions.length -1)) {
            questionAnswer.addEventListener("click", generateQuestion); 
        }  else if (questionNum === (questions.length-1)) {
            questionAnswer.addEventListener("click",endOfQuiz);
        

        }


        main.appendChild(questionAnswer);
    }

    questionNum++;

}

//ending page of quiz with score

let removeCorrectCounter=0; 
function removeCorrect() {
    if (removeCorrectCounter === 0){
        main.removeChild(main.firstChild);
        removeCorrectCounter++
    }
}   

function youLose() {
   
    clearMain()
    let loseEl= document.createElement("h1");
    loseEl.textContent="You ran out of time!!!";
    loseEl.style.color= "gold"; 
    loseEl.setAttribute("class", "col-12");
    // loseEl.style.backgroundColor= "black";  
    main.style.backgroundColor= "rgba(0,0,0,0.1)";  
    main.appendChild(loseEl); 
    document.body.style.backgroundImage="url(assets/images/lina-white-K9nxgkYf-RI-unsplash.jpg)"; 

    // let loseDivEl= document.createElement("div"); 
    // loseDivEl.setAttribute("class", "row d-flex justify-content-center"); 
    let retryBtn = document.createElement("button");
    retryBtn.textContent="Try Again";
    retryBtn.setAttribute("class", "try btn btn-warning"); 
    retryBtn.addEventListener("click", function(){
        window.location.href = "index.html"; 
    })
    main.appendChild(retryBtn); 
    gameOverPlay()
}


function redirect(){
    window.location.href = "highscores.html"; 
     
}
 
function endOfQuiz() {

    isTimeStop = true; 
    let score= time; 

    endDeclaration= document.createElement("h4");
    endDeclaration.textContent= "Congratulations! You beat the clock.";
    endDeclaration.setAttribute("class", "p-4 mb-4 m-2 col-12");
   

    main.appendChild(endDeclaration);
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 text-center");


    endScore = document.createElement("h5");
    endScore.setAttribute("id", "score"); 
    endScore.setAttribute("class", "w-100"); 
    endScore.textContent="Your score is " + score; 
    main.appendChild(endScore);


    scoreFormContainerEl= document.createElement("form");
    scoreFormContainerEl.setAttribute("class", "w-100 m-2");; 
    main.appendChild(scoreFormContainerEl); 

    scoreFormDividerEl = document.createElement("div");
    scoreFormDividerEl.setAttribute("class", "form-group row d-flex justify-content-around"); 
    scoreFormContainerEl.appendChild(scoreFormDividerEl); 

    scoreFormLabelEl = document.createElement("label");
    scoreFormLabelEl.setAttribute("for", "initials");
    scoreFormLabelEl.setAttribute("class", "col-sm-3 p-1 mb-1"); 
    scoreFormLabelEl.textContent="Enter Name"; 
    scoreFormDividerEl.appendChild(scoreFormLabelEl);

  
    scoreFormInputEl = document.createElement("input"); 
    scoreFormInputEl.setAttribute("type", "text");
    scoreFormInputEl.setAttribute("class", "form-control col-sm-3 p-1 mb-1");
    scoreFormInputEl.addEventListener("click", removeCorrect);  
    scoreFormDividerEl.appendChild(scoreFormInputEl); 


    scoreFormSubmit = document.createElement("button"); 
    scoreFormSubmit.setAttribute("type", "submit"); 
    scoreFormSubmit.setAttribute("class", "btn btn-success col-sm-3 p-1 mb-1"); 
    scoreFormSubmit.textContent= "Submit"; 
    scoreFormSubmit.addEventListener("click", function(event){
        event.preventDefault(); 
        if (scoreFormInputEl.value === ""){
        alert("Please insert your initials!"); 
        return; 
        }
        if (typeof(Storage) !== "undefined") {
    
            storedHighScores= JSON.parse(localStorage.getItem("storedHighScores")); 
            if (storedHighScores=== null) {
                storedHighScores = [];
            }
            storedHighScores.push({"initals":scoreFormInputEl.value, "score": score, "quizType": quizSelected}); 
            console.log(storedHighScores); 

            storedHighScores= JSON.stringify(storedHighScores); 
            localStorage.setItem("storedHighScores", storedHighScores); 

            } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
          }
        redirect();
    });
    scoreFormDividerEl.appendChild(scoreFormSubmit); 
 
}

