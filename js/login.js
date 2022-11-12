import app from './static/env.js'

function store(){ 
    //stores items in sessionStorage
    var name = document.getElementById('uname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    const creds = {
        name: name,
        email: email,
        password: password,
    }

    //converting object to string
    window.sessionStorage.setItem('creds', JSON.stringify(creds));  
}

document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault()
    store()
    window.location.href = app.hostUrl + "/enter_flight.html"
}) 

