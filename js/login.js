import app from './static/env.js'

function store(){ //stores items in sessionStorage
    var name = document.getElementById('uname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    const creds = {
        name: name,
        email: email,
        password: password,
    }

    window.sessionStorage.setItem('creds',JSON.stringify(creds));  
    //converting object to string
}

// function retrieveRecords(){ 
//     //retrieves items in sessionStorage
//     console.log("retrive records");
//     var records = window.sessionStorage.getItem('creds');
//     var paragraph = document.createElement("p");
//     var infor = document.createTextNode(records);
//     paragraph.appendChild(infor);
//     var element = document.getElementById("retrieve");
//     element.appendChild(paragraph);
// }

document.querySelector("form").addEventListener('submit', (event) => {
    event.preventDefault()
    store()
    window.location.href = app.hostUrl + "/enter_flight.html"
}) 

