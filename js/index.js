import clock from './clock.js'
const d = document

d.addEventListener("DOMContentLoaded", e => {
    clock(".clock", "#btn-start", "#btn-stop", "#btn-reset")
})