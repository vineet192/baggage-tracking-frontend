document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(document.querySelector("form"))

    let status = formData.get("status")

    //TODO : get location here dynamically. https://www.w3schools.com/html/html5_geolocation.asp
    //After getting the latitude and longitude, format them as <lat>;<long> and pass to smart contract.

    if (status === "checkin") {
        //Smart contract call to checkInBaggage
    }
    else if (status === "security") {

        //Smart contract call to addBaggageToSecurity

    }
    else {
        //Smart contract call to addBaggageToBoarding
    }
})