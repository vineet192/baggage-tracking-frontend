import app from './static/env.js'

function store(){ 
    //stores items in sessionStorage
    var name = document.getElementById('uname').value;
    var email = document.getElementById('email').value;

    const creds = {
        name: name,
        email: email
    }

    //converting object to string
    window.sessionStorage.setItem('creds', JSON.stringify(creds));  
}

document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault()
    store()
    window.location.href = app.hostUrl + "/enter_flight.html"
}) 

