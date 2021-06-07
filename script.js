const ipAddress = document.getElementById("user-ip-address");
const userLocation = document.getElementById("user-location");
const timezone = document.getElementById("user-timezone");
const userIsp = document.getElementById("user-isp");
const url = "https://geo.ipify.org/api/v1?apiKey=at_NSc7fE041qkOYaoyTMBfbZu4SyJT4&ipAddress="
let resultFinal = {};


function getIpAddress() {
    const inputVal = document.getElementById("ip-address-input").value;
    fetch(`${url}+${inputVal}`)
        .then(response => response.json())
        .then(result => {
            ipAddress.innerText = result.ip;
            userLocation.innerText = result.location.city;
            timezone.innerText = result.location.timezone;
            userIsp.innerText = result.isp;
            resultFinal = {
                lat: result.location.lat,
                long: result.location.lng
            }
            initMap(resultFinal.lat, resultFinal.long);
        })
}

function initMap(lat, long) {
    //set initial view of the map
    var mymap = L.map('mapid').setView([lat, long], 17);

    //change marker icon
    var mapIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 38]
    });
    L.marker([lat, long], { icon: mapIcon }).addTo(mymap);

    //set tileLayer for the map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2hvcnBlZTIzIiwiYSI6ImNrcGc3dXJqcTAxcWsyb244bXhqdHd6NmIifQ.-dJep14NhquKkNfvx2lrBg'
    }).addTo(mymap);
}

document.addEventListener("DOMContentLoaded", function () {
    getIpAddress();
});