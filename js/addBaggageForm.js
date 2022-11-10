import app from './static/env.js'

var user = sessionStorage.getItem("creds");
console.log(user)

let parsedData = JSON.parse(user)

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()

    const data = new FormData(event.target);

    data.append("cust_name", parsedData.name)
    data.append("cust_email", parsedData.email)

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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

