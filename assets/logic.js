//CountDown on page

const timeOnPage= document.getElementById("timer")
let time= 75;
let isTimeStop= false; 

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

document.getElementById("start").addEventListener("click", countDown);

//Quiz questions

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

// Question/Answer Format

main= document.getElementById("main");

let questionNum=0;



function congrats(){
    let divider = document.createElement("div");
    divider.setAttribute("class","container text-center");

    
    // main.appendChild(divider);

    main.insertBefore(divider, main.children[0]); 
    let lineDivide = document.createElement("hr");
    let congMessage = document.createElement("h5");
    congMessage.textContent = "Correct!";
    congMessage.setAttribute("class", "p-2 m-2");
    
    divider.appendChild(congMessage);
    divider.appendChild(lineDivide);
  
}

function wrong(){
    let divider = document.createElement("div");
    divider.setAttribute("class","container text-center");
    main.insertBefore(divider, main.children[0]);
    let lineDivide = document.createElement("hr");
    let wrongMessage = document.createElement("h5");
    wrongMessage.textContent = "Wrong. You just lost 10 seconds!";
    wrongMessage.setAttribute("class", "p-2 m-2 text-center");
    
    divider.appendChild(wrongMessage);
    divider.appendChild(lineDivide);
    resetCountDown();



}

function clearMain(){
    while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
    }

}




function generateQuestion(){

    clearMain();

    questionsTitle= document.createElement("h4");
    questionsTitle.textContent= questions[questionNum].title
    questionsTitle.setAttribute("class", "p-4 mb-4 m-2 col-12");

    main.appendChild(questionsTitle);
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 bg-light text-center");



    for (i=0; i < 3; i++) {
        let questionAnswer =  document.createElement("button");
        questionAnswer.textContent= questions[questionNum].choices[i];
        questionAnswer.setAttribute("class", "answerChoice btn btn-primary col-12 col-lg-3 my-2 m-lg-auto p-2");
        questionAnswer.setAttribute("id", "question:"+questionNum + " answer:"+i);

    
        function correctAnswer (){
            if (questions[questionNum].choices[i]=== questions[questionNum].answer){
                
                questionAnswer.addEventListener("click", congrats);

            } else {
                questionAnswer.addEventListener("click", wrong);
               

            }
        }


        if (questionNum !== (questions.length -1)) {
            questionAnswer.addEventListener("click", generateQuestion);
            correctAnswer();
        }  else if (questionNum === (questions.length-1)) {
            questionAnswer.addEventListener("click",endOfQuiz);
            correctAnswer();

            //Don't know why this is working this way. If not included then it doesn't work correctly but if included it subtracts score and doesn't need this function?
            questionAnswer.addEventListener("click", updateScore); 
            // if (questions[questionNum].choices[i] !== questions[questionNum].answer){
            //     questionAnswer.addEventListener("click", updateScore);
            // } 

        }


        main.appendChild(questionAnswer);
    }

    questionNum++;

}

function endOfQuiz() {

    clearMain();

    endDeclaration= document.createElement("h4");
    endDeclaration.textContent= "Congratulations! You've finished the quiz.";
    endDeclaration.setAttribute("class", "p-4 mb-4 m-2 col-12");

    main.appendChild(endDeclaration);
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 bg-light text-center");


    endScore = document.createElement("h5");
    endScore.setAttribute("id", "score"); 
    endScore.textContent="Your score is " + time; 

    isTimeStop = true; 
    

    endDeclaration.setAttribute("class", "p-4 mb-4 m-2 col-12");

    main.appendChild(endScore);





}

function updateScore() {
    score= document.getElementById("score");
    score.textContent= "Your score is " + time; 
  
}



document.getElementById("start").addEventListener("click", generateQuestion);



//What happens when you answer the quesiton




