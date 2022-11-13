import app from './static/env.js'

let user = sessionStorage.getItem("email");
let flight_number = sessionStorage.getItem("flight_no")
console.log(user)


if (!flight_number) {
    alert("Something went wrong!");
    window.location.href = app.hostUrl + "enter_flight.html"
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()

    const data = new FormData(event.target);

    data.append("cust_name", sessionStorage.getItem("name"))
    data.append("cust_email", user)
    data.append("flight", flight_number)

    const value = Object.fromEntries(data.entries());

    console.log(value);

    fetch(app.serverUrl + "/checkin_baggage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data.id);
            window.location.href = app.hostUrl + "/customer.html"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

