import clock from './clock.js'
const d = document

d.addEventListener("DOMContentLoaded", e => {
    clock(".timer", "#start-timer", "#reset-timer")
})