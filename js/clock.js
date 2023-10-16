import {progressBar,stopProgressBar} from './progressBar-test.js';

const d = document;

const intervalTypes = Object.freeze({
    work: Symbol("work"),
    rest: Symbol("rest"),
});

export default function clock(clock, btnPlay, btnReset) {
    const work = {
        defaultDuration: 10,
        actualDuration:  10,
        reset() {
            this.actualDuration = this.defaultDuration;
        },
    };

    const rest = {
        defaultDuration: 5,
        actualDuration: 5,
        reset() {
            this.actualDuration = this.defaultDuration;
        },
    };

    let currentInterval,
        currentIntervalType = work, // tipo de intervalo
        periods = 0; // cantidad de periodos

    /* funcion que actualiza el reloj*/
    function updateClockDisplay(time) {
        const minutes = Math.floor(time / 60),
            seconds = time % 60,
            formattedMinutes = minutes < 10 ? "0" + minutes : minutes,
            formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        d.querySelector(clock).innerHTML = `<p><span>${formattedMinutes}:${formattedSeconds}</span></p>`; // actualiza el reloj
    }

    function toggleButtonState(disabled) {
        d.querySelector(btnPlay).disabled = disabled;
        if (disabled) {
            console.log("Boton desactivado");
        } else {
            console.log("Boton activado");
        }
    }

    // funcion que inicia el intervalo
    function startPomodoro() {
        toggleButtonState(true); // Cambia el estado del botón

        const progressBarOptions = {
            totalTime: currentIntervalType.actualDuration,
            updateCallback: updateClockDisplay,
        };
        progressBar(progressBarOptions);

        currentInterval = setInterval(() => {
            if (currentIntervalType.actualDuration > 0) {
                currentIntervalType.actualDuration--;
                updateClockDisplay(currentIntervalType.actualDuration);
            } else {
                clearInterval(currentInterval); // Detener el temporizador actual
                stopProgressBar(); // Detener la barra de progreso
                if (currentIntervalType === work) {
                    currentIntervalType.reset();
                    currentIntervalType = rest;
                    updateClockDisplay(currentIntervalType.actualDuration);
                    startPomodoro(); // Iniciar automáticamente el siguiente intervalo (descanso)
                } else {
                    // El descanso ha terminado, permite al usuario iniciar manualmente el próximo intervalo completo
                    toggleButtonState(false);
                    currentIntervalType = work;
                    periods++;
                    d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}`;
                    work.reset(); // Resetear el tiempo de trabajo
                    rest.reset(); // Resetear el tiempo de descanso
                    updateClockDisplay(work.defaultDuration);
                }
            }
        }, 1000);
    }

    /* funcion que reinicia el reloj pomodoro completo */
    function resetClock() {
        clearInterval(currentInterval);
        stopProgressBar();
        periods = 0; // reinicia los periodos
        currentIntervalType = work; // reinicia el tipo de intervalo
        work.reset(); // Resetear el tiempo de trabajo
        rest.reset(); // Resetear el tiempo de descanso
        updateClockDisplay(work.defaultDuration); // actualiza el reloj

        d.querySelector(".periods-text").innerText = `Periodo/s: ${periods}`; // actualiza el contador de periodos

        toggleButtonState(false); // Cambia el estado del botón
    }
    updateClockDisplay(work.defaultDuration); // actualiza el reloj al cargar la pagina por primera vez

    d.querySelector(btnPlay).addEventListener("click", startPomodoro);
    d.querySelector(btnReset).addEventListener("click", resetClock);
}