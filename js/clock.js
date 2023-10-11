const d = document
const intervalTypes = Object.freeze({
	work: Symbol("work"),
	rest: Symbol("rest"),
});

export default function clock(clock, btnPlay, btnReset) {
    const work = {
        defaultDuration: 10,
        actualDuration: 10,
        reset() {
            this.actualDuration = this.defaultDuration;
        },
        continueInterval() {
            currentIntervalType = rest;
            currentIntervalType.reset();
            startPomodoro();
        }
    }
    
    const rest = {
        defaultDuration: 5,
        actualDuration: 5,
        reset() {
            this.actualDuration = this.defaultDuration;
        },
        continueInterval() {
            currentIntervalType = work;
            periods++;
            d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}`;
            currentIntervalType.reset();
        }
    }

    let currentInterval,
    currentIntervalType = work, // tipo de intervalo
    periods = 0; // cantidad de periodos

    /* funcion que actualiza el reloj*/
    function updateClockDisplay(time) {
        const minutes = (Math.floor(time / 60)),
            seconds = time % 60,
            formattedMinutes = minutes < 10 ? "0" + minutes : minutes,
            formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        d.querySelector(clock).innerHTML = `<p><span>${formattedMinutes}:${formattedSeconds}</span></p>` // actualiza el reloj
    }

    function toggleButtonState(disabled) {
        d.querySelector(btnPlay).disabled = disabled
        d.querySelector(btnPlay).classList.toggle("btn-timer-stop")
    }

    // funcion que inicia el intervalo
    function startPomodoro() {
        currentInterval = setInterval(() => {
            if (currentIntervalType.actualDuration > 0) {
                currentIntervalType.actualDuration--;
                updateClockDisplay(currentIntervalType.actualDuration);
            } else {
                clearInterval(currentInterval); // Detener el temporizador actual
                currentIntervalType.continueInterval();
                updateClockDisplay(currentIntervalType.actualDuration);
            }
        }, 1000);
        toggleButtonState(true);
    }

    /* funcion que reinicia el reloj pomodoro completo */
    function resetClock() {
        clearInterval(currentInterval);
        periods = 0; // reinicia los periodos
        currentIntervalType = work; // reinicia el tipo de intervalo
        currentIntervalType.reset();
        updateClockDisplay(currentIntervalType.defaultDuration); // actualiza el reloj
        d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}`; // actualiza el contador de periodos
        toggleButtonState(false);
    }

    updateClockDisplay(currentIntervalType.defaultDuration) // actualiza el reloj al cargar la pagina por primera vez

    /* botones de inicio y fin del intervalo */
    d.querySelector(btnPlay).addEventListener("click", startPomodoro);
    d.querySelector(btnReset).addEventListener("click", resetClock);
}