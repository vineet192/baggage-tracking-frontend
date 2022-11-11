import app from './static/env.js'

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    let flight_no = document.getElementById("flight_no").value;

    let isFlightVerified = await verify_flight(flight_no)

    if (!isFlightVerified) {
        alert("We could not verify that flight number")
        return;
    }

    sessionStorage.setItem("flight_no", flight_no);

    window.location.href = app.hostUrl + "/customer.html"
})

async function verify_flight(flight_no) {
    let response;

    try {
        response = await fetch(app.serverUrl + `/verify_flight?flight_no=${flight_no}`)
    } catch (err) {
        console.error(err);
        return false
    }

    if (response.status === 200) {
        return true
    }

    return false

}