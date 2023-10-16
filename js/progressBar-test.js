const semicircles = document.querySelectorAll('.semicircle');
const d = document;

let timerLoop;
let currentTime = 0; // Agrega una variable para llevar el tiempo actual

export function progressBar(options){ 
    const {totalTime, updateCallback} = options;

    timerLoop = setInterval(() => {
        const remainingTime = totalTime - currentTime;

        // console.log(`Total Time = ${totalTime}`);
        // console.log(`Current Time = ${currentTime}`)
        // console.log(`Remaining Time = ${remainingTime}`)

        const angle = (remainingTime / totalTime) * 360;
    
        if(angle > 180){
            semicircles[2].style.display = 'none';
            semicircles[0].style.transform = 'rotate(180deg)';
            semicircles[1].style.transform = `rotate(${angle}deg)`;
        }
        else{
            semicircles[2].style.display = 'block';
            semicircles[0].style.transform = `rotate(${angle}deg)`;
            semicircles[1].style.transform = `rotate(${angle}deg)`;
        }

        // if(remainingTime <= 5){
        //     semicircles[0].style.background = 'linear-gradient(rgb(237, 38, 170), rgb(58, 70, 178))';
        //     semicircles[1].style.background = 'linear-gradient(rgb(237, 38, 170), rgb(58, 70, 178))';
        //     d.querySelector("#timer").style.color = 'rgb(237, 38, 170)';
        // }
    
        if(remainingTime < 0){
            clearInterval(timerLoop);
            semicircles[0].style.display = 'none';
            semicircles[1].style.display = 'none';
            semicircles[2].style.display = 'none';
            semicircles[0].style.backgroundColor = "rgb(42, 30, 92)"
            semicircles[1].style.backgroundColor = "rgb(42, 30, 92)"
            d.querySelector("#timer").style.color = "whitesmoke"

        }
        updateCallback(remainingTime);
        currentTime++;
    }, 1000);
}

export function stopProgressBar(){
    currentTime = 0; // Reiniciar el tiempo actual al principio

    clearInterval(timerLoop);

    semicircles[0].style.display = 'block';
    semicircles[1].style.display = 'block';
    semicircles[2].style.display = 'block';
    semicircles[0].style.transform = 'rotate(0deg)';
    semicircles[1].style.transform = 'rotate(0deg)';
    semicircles[2].style.transform = 'rotate(0deg)';
    
    semicircles[0].style.backgroundColor = "rgb(42, 30, 92)"
    semicircles[1].style.backgroundColor = "rgb(42, 30, 92)"
    d.querySelector("#timer").style.color = "whitesmoke"
}