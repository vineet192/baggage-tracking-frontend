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

    if (sessionStorage.getItem("email")){
        window.location.href = app.hostUrl + "/customer.html"
    }
    else{
        window.location.href = app.hostUrl + "/register.html"
    }

})

//Make a GET request to the server to verify the specified flight number
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