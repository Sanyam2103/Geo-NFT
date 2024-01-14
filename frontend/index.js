import { ethers } from "./ethers-5.6.esm.min.js"
//import { abi, contractAddress } from "./constants.js"
// Import Web3.js library
//import Web3 from "web3"

// Connect to the Ethereum node (provider)
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, abi, provider)
const connectbutton = document.getElementById("connectButton")
const playbutton = document.getElementById("play")
const locationbutton = document.getElementById("locator")
const accessToken =
    "pk.eyJ1Ijoic2FueWFtMjEiLCJhIjoiY2xyY2wzajZtMHl0bzJ1dnh3a2F2Mm9jdSJ9.n_um7ZhdZ4dJNv06SdEmWw"
let latitude, longitude

connectbutton.onclick = connect
playbutton.onclick = play
locationbutton.onclick = getLocation

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            connectbutton.innerHTML = "Connected"
        } catch (e) {
            console.log(e)
        }
    } else {
        connectbutton.innerHTML = "Please install metamask"
    }
}

function play() {
    // Get the element with the id "hiddenText"
    var hiddenTextElement = document.getElementById("hiddenText")

    // Show the element by changing its display style property
    hiddenTextElement.style.display = "block"
}
const x = document.getElementById("demo")

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError)
    } else {
        x.innerHTML = "Geolocation is not supported by this browser."
    }
}

function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    //x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break
    }
}
// latitude = 19.316083
// longitude = 72.855419
const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`

fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        // Extract postal code from the API response
        const postalCode = getPostalCodeFromResponse(data)
        console.log("Postal Code:", postalCode)
    })
    .catch((error) => console.error("Error:", error))

function getPostalCodeFromResponse(response) {
    // Extract the postal code from the response
    const features = response.features
    if (features && features.length > 0) {
        const context = features[0].context
        const postalCodeContext = context.find((item) => item.id.startsWith("postcode"))
        return postalCodeContext ? postalCodeContext.text : null
    }
    return null
}
