//Global variables

const timeOnPage= document.getElementById("timer")
let time= 75;
let isTimeStop= false; 

const main= document.getElementById("main");
let questionNum=0;

//Clicking start button
document.getElementById("start").addEventListener("click", countDown);
document.getElementById("start").addEventListener("click", clearMain);
document.getElementById("start").addEventListener("click", generateQuestion);


//Functions invovling the timer
function countDown(){

    let timer= setInterval(function(){
       timeOnPage.textContent= "Time: "+ time + "s";
       time--;

       if (time === 0 || isTimeStop) {
        clearInterval(timer);
        timeOnPage.textContent= "Time: "; 
    }

    }, 1000)
}

function resetCountDown(){
    console.log(time);
    time -= 10;
    console.log(time);
    timeOnPage.textContent= "Time: "+ time + "s";

}


//Quiz question bank

const questions = [
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
]

//Clear html on page in container Main

function clearMain(){
    while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
    }

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

}

// function to create new quiz questions on click

function generateQuestion(){

    //format main section 
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 bg-light text-center");


    //populate question
    questionsTitle= document.createElement("h4");
    questionsTitle.textContent= questions[questionNum].title
    questionsTitle.setAttribute("class", "p-4 mb-4 m-2 col-12");

    main.appendChild(questionsTitle);
    
    // populate answer choices
    for (i=0; i < 3; i++) {
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
            

            //Don't know why this is working this way. If not included then it doesn't work correctly but if included it subtracts score and doesn't need this function?
            // questionAnswer.addEventListener("click", updateScore); 
            // if (questions[questionNum].choices[i] !== questions[questionNum].answer){
            //     questionAnswer.addEventListener("click", updateScore);
            // } 

        }


        main.appendChild(questionAnswer);
    }

    questionNum++;

}

//ending page of quiz with score

function endOfQuiz() {

    isTimeStop = true; 

    endDeclaration= document.createElement("h4");
    endDeclaration.textContent= "Congratulations! You beat the clock.";
    endDeclaration.setAttribute("class", "p-4 mb-4 m-2 col-12");
   

    main.appendChild(endDeclaration);
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 bg-light text-center");


    endScore = document.createElement("h5");
    endScore.setAttribute("id", "score"); 
    endScore.setAttribute("class", "w-100"); 
    endScore.textContent="Your score is " + time; 
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
    scoreFormLabelEl.textContent="Enter Initials"; 
    scoreFormDividerEl.appendChild(scoreFormLabelEl);

    scoreFormInputEl = document.createElement("input"); 
    scoreFormInputEl.setAttribute("type", "text");
    scoreFormInputEl.setAttribute("class", "form-control col-sm-3 p-1 mb-1"); 
    scoreFormDividerEl.appendChild(scoreFormInputEl); 

    scoreFormSubmit = document.createElement("button"); 
    scoreFormSubmit.setAttribute("type", "submit"); 
    scoreFormSubmit.setAttribute("class", "btn btn-success col-sm-3 p-1 mb-1"); 
    scoreFormSubmit.textContent= "Submit"; 
    scoreFormDividerEl.appendChild(scoreFormSubmit); 


}


    



//     <form>
//   <div class="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
//   </div>
//   <div class="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
//   </div>
//   <div class="form-check">
//     <input type="checkbox" class="form-check-input" id="exampleCheck1">
//     <label class="form-check-label" for="exampleCheck1">Check me out</label>
//   </div>
//   <button type="submit" class="btn btn-primary">Submit</button>
// </form>
// }

// No longer need this function now that correctanswer is before generate quiz question
// function updateScore() {
//     score= document.getElementById("score");
//     score.textContent= "Your score is " + time; 
  
// }







