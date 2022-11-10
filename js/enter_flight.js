import app from './static/env.js'

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    let flight_no = document.getElementById("flight_no").value;

    let isFlightVerified = await verify_flight(flight_no)

    if (!isFlightVerified) {
        return;
    }

    sessionStorage.setItem("flight_no", flight_no);

    window.location.href = app.hostUrl + "/customer.html"
})

async function verify_flight(flight_no) {
    let response;

    response = await fetch(app.serverUrl + `/verify_flight?flight_no=${flight_no}`)

    if(response.status === 200){
        return true
    }

    return true

}