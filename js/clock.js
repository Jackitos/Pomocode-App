const d = document
export default function clock(clock, btnPlay, btnStop, btnReset) {
    let timeInterval, // variable de intervalo
        totalTime = 10, // tiempo total del intervalo
        periods = 0 // cantidad de periodos

    /* funcion que actualiza el reloj*/
    function updateTimerDisplay() {
        const minutes = (Math.floor(totalTime / 60)) < 10 ? "0" + (Math.floor(totalTime / 60)) : (Math.floor(totalTime / 60)),
            seconds = (totalTime % 60) < 10 ? "0" + (totalTime % 60) : (totalTime % 60)

        d.querySelector(clock).innerHTML = `<span>${minutes}:${seconds}</span>` // actualiza el reloj
    }

    // funcion que inicia el intervalo
    function startInterval() {
        timeInterval = setInterval(() => {
            if (totalTime > 0) {
                totalTime--; // decrementa el tiempo
                updateTimerDisplay(); // actualiza el reloj
            }
            else {
                periods++ // incrementa los periodos
                d.querySelector("#periods").innerText = `count: ${periods}` // actualiza el contador de periodos
                stopInterval(timeInterval) // detiene el intervalo
            }
        }, 1000)
        d.querySelector(btnPlay).disabled = true // deshabilita el boton de inicio
    }

    /* Funcion que detiene el intervalo */
    function stopInterval(interval) {
        clearInterval(interval) // detiene el intervalo
        totalTime = 10 // reinicia el tiempo
        updateTimerDisplay() // actualiza el reloj
        d.querySelector(btnPlay).disabled = false // habilita el boton de inicio
    }

    /* funcion que reinicia el reloj pomodoro */
    function resetTimer() {
        stopInterval(timeInterval) // detiene el intervalo
        totalTime = 10 // reinicia el tiempo
        periods = 0 // reinicia los periodos
        updateTimerDisplay() // actualiza el reloj
        d.querySelector("#periods").innerText = `count: ${periods}` // actualiza el contador de periodos
    }

    updateTimerDisplay() // actualiza el reloj al cargar la pagina por primera vez

    /* botones de inicio y fin del intervalo */
    d.addEventListener("click", e => {
        if (e.target.matches(btnPlay)) startInterval()
        if (e.target.matches(btnStop)) stopInterval(timeInterval)
        if (e.target.matches(btnReset)) resetTimer()
    })
}