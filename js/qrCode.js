let baggageId = sessionStorage.getItem("baggage_to_track")
console.log(baggageId)

window.addEventListener("load", () => {
    var qrc = new QRCode(document.getElementById("qrcode"), {
        text: baggageId,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
});