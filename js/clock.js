const d = document
export default function clock(clock, btnPlay, btnReset) {
    const times = {
        work: 10,
        rest: 5
    }

    let currentInterval,
        currentIntervalType = "work", // tipo de intervalo
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
        if (currentInterval) {
            clearInterval(currentInterval);
        }

        currentInterval = setInterval(() => {
            if (times[currentIntervalType] > 0) {
                times[currentIntervalType]--;
                updateClockDisplay(times[currentIntervalType]);
            } else {
                clearInterval(currentInterval); // Detener el temporizador actual

                if (currentIntervalType === "work") {
                    currentIntervalType = "rest";
                    times[currentIntervalType] = 5; // Establecer el tiempo de descanso
                } else {
                    currentIntervalType = "work";
                    periods++;
                    d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}`;
                    times[currentIntervalType] = 10; // Establecer el tiempo de trabajo
                }

                updateClockDisplay(times[currentIntervalType]);
                startPomodoro(); // Comenzar el siguiente intervalo
            }
        }, 1000);
        toggleButtonState(true);
    }

    /* funcion que reinicia el reloj pomodoro completo */
    function resetClock() {
        clearInterval(currentInterval);
        times.work = 10;
        times.rest = 5;
        periods = 0; // reinicia los periodos
        currentIntervalType = "work"; // reinicia el tipo de intervalo
        updateClockDisplay(times.work); // actualiza el reloj
        d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}`; // actualiza el contador de periodos
        toggleButtonState(false);
    }

    updateClockDisplay(times.work) // actualiza el reloj al cargar la pagina por primera vez

    /* botones de inicio y fin del intervalo */
    d.querySelector(btnPlay).addEventListener("click", startPomodoro);
    d.querySelector(btnReset).addEventListener("click", resetClock);
}