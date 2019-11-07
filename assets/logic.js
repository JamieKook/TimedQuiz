//CountDown on page

const timeOnPage= document.getElementById("timer")

function countDown(){
    let time= 75; 
    let timer= setInterval(function(){
       timeOnPage.textContent= "Time: "+ time + "s"; 
       time--; 

       if (time === 0) {
        clearInterval(timer); 
    }

    }, 1000)

    
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
        answer: "American Buffalo"
    }
]

// Question/Answer Format

main= document.getElementById("main"); 

let questionNum=0; 





function generateQuestion(){

    while (main.hasChildNodes()) {  
        main.removeChild(main.firstChild);
    }

    questionsTitle= document.createElement("h4");
    questionsTitle.textContent= questions[questionNum].title
    questionsTitle.setAttribute("class", "p-4 mb-4 m-2");
     
    main.appendChild(questionsTitle); 
    main.setAttribute("class", "container row p-5 mx-auto my-5 w-75 bg-light text-center"); 

    for (i=0; i < 3; i++) {
        let questionAnswer =  document.createElement("button"); 
        questionAnswer.textContent= questions[questionNum].choices[i];
        questionAnswer.setAttribute("class", "answerChoice btn btn-primary col-12 col-md-3 my-2 m-md-auto p-2");
        questionAnswer.setAttribute("id", "question:"+questionNum + " answer:"+i); 
        if (questionNum !== (questions.length -1)) {
            questionAnswer.addEventListener("click", generateQuestion);
        }  
        main.appendChild(questionAnswer); 
    }

    questionNum++; 
  

}



document.getElementById("start").addEventListener("click", generateQuestion);



//What happens when you answer the quesiton 




