import app from './static/env.js'

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let flight_no = document.getElementById("flight_no").value;
    sessionStorage.setItem("flight_no", flight_no);

    window.location.href = app.hostUrl + "/customer.html"
})