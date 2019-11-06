const timeOnPage= document.getElementById("timer")

function countDown(){
    let time= 75; 
    let timer= setInterval(function(){
       timeOnPage.textContent= "Time: "+ time + "s"; 
       time--; 

    }, 1000)
}

document.getElementById("start").addEventListener("click", countDown);
