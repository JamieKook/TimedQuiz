//CountDown on page

const timeOnPage= document.getElementById("timer")

function countDown(){
    let time= 75; 
    let timer= setInterval(function(){
       timeOnPage.textContent= "Time: "+ time + "s"; 
       time--; 

    }, 1000)

    if (time === 0) {
        clearInterval(timer); 
    }
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

// Question/Answer Function

main= document.getElementById("main"); 

function askQuestion(arr){
    while (main.hasChildNodes()) {  
        main.removeChild(main.firstChild);
      }
    // for(i=0; i < arr.length; i++){
        questionsTitle= document.createElement("h4");
        questionsTitle.textContent= questions[0].title
        main.append(questionsTitle); 


}

askQuestion(questions); 
