const d = document
export default function clock(clock, btnPlay, btnReset) {
    let timeWorkInterval, // variable de intervalo de trabajo,
        timeRestInterval, // variable de intervalo de descanso
        totalWorkTime = 10, // tiempo total del intervalo de trabajo,
        totalRestTime = 20, // tiempo total del intervalo de descanso
        periods = 0 // cantidad de periodos

    /* funcion que actualiza el reloj*/
    function updateTimerDisplay(timeStage) {
        const minutes = (Math.floor(timeStage / 60)) < 10 ? "0" + (Math.floor(timeStage / 60)) : (Math.floor(timeStage / 60)),
            seconds = (timeStage % 60) < 10 ? "0" + (timeStage % 60) : (timeStage % 60)

        d.querySelector(clock).innerHTML = `<p><span>${minutes}:${seconds}</span></p>` // actualiza el reloj
    }

    // funcion que inicia el intervalo
    function startInterval() {
        timeWorkInterval = setInterval(() => {
            if (totalWorkTime > 0) {
                totalWorkTime--
                updateTimerDisplay(totalWorkTime)
            }
            else {
                stopWorkInterval(timeWorkInterval)
                timeRestInterval = setInterval(() => {
                    if (totalRestTime > 0) {
                        totalRestTime--
                        updateTimerDisplay(totalRestTime)
                    }
                    else {
                        stopRestInterval(timeRestInterval)
                        periods++ // incrementa los periodos
                        d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}` // actualiza el contador de periodos
                        updateTimerDisplay(totalWorkTime)
                    }
                }, 1000)
            }
            d.querySelector(btnPlay).disabled = true // deshabilita el boton de inicio
            d.querySelector(btnPlay).classList.add("btn-timer-stop")
        }, 1000)
    }

    /* Funcion que detiene el intervalo de trabajo */
    function stopWorkInterval(interval) {
        clearInterval(interval) // detiene el intervalo
        totalWorkTime = 10 // reinicia el tiempo
        // updateTimerDisplay(totalWorkTime) // actualiza el reloj
        d.querySelector(btnPlay).disabled = false // habilita el boton de inicio
    }

    /* Funcion que detiene el intervalo de descanso*/
    function stopRestInterval(interval) {
        clearInterval(interval) // detiene el intervalo
        totalRestTime = 20 // reinicia el tiempo
        updateTimerDisplay(totalRestTime) // actualiza el reloj
        d.querySelector(btnPlay).disabled = false // habilita el boton de inicio
    }

    /* funcion que reinicia el reloj pomodoro completo */
    function resetTimer() {
        stopWorkInterval(timeWorkInterval) // detiene el intervalo
        stopRestInterval(timeRestInterval) // detiene el intervalo
        totalWorkTime = 10 // reinicia el tiempo
        totalRestTime = 20 // reinicia el tiempo
        periods = 0 // reinicia los periodos
        updateTimerDisplay(totalWorkTime) // actualiza el reloj
        d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}` // actualiza el contador de periodos
    }

    updateTimerDisplay(totalWorkTime) // actualiza el reloj al cargar la pagina por primera vez

    /* botones de inicio y fin del intervalo */
    d.addEventListener("click", e => {
        if (e.target.matches(btnPlay)) startInterval()
        if (e.target.matches(btnReset)) resetTimer()
    })
}























// if (totalWorkTime > 0) {
//     totalWorkTime--; // decrementa el tiempo
//     updateTimerDisplay(); // actualiza el reloj
// }
// else {
//     stopInterval(timeWorkInterval)
//     timeRestInterval = setInterval(() => {
//         if (totalRestTime > 0) {
//             totalRestTime--
//             updateTimerRestDisplay()
//         }
//         else {

//         }
//     }, 1000)
// }




// stopInterval(timeWorkInterval)
// timeRestInterval = setInterval(() => {
//     totalRestTime--
//     updateTimerRestDisplay()
//     if (totalRestTime > 0) {
//         totalRestTime--
//         updateTimerRestDisplay()
//     } else {
//         stopInterval(timeRestInterval)
//     }
// }, 1000)