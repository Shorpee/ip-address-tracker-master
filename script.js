const ipAddress = document.getElementById("user-ip-address");
const userLocation = document.getElementById("user-location");
const timezone = document.getElementById("user-timezone");
const userIsp = document.getElementById("user-isp");
const url = "https://geo.ipify.org/api/v1?apiKey=at_NSc7fE041qkOYaoyTMBfbZu4SyJT4"
let resultFinal = {};
let mapInitialized = false;
let map;
let marker;

function getIpAddress() {
    const inputVal = document.getElementById("ip-address-input").value;
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const domainRegex = /([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/;

    let input_api = "";
    if(inputVal.match(ipRegex)){
        input_api = "&ipAddress=" + inputVal;
    }else if (inputVal.match(domainRegex)){
        input_api = "&domain=" + inputVal;

    }else{

        return console.error("Invalid Input");
    }
    
    // console.log(inputVal)
    fetch(`${url}+${input_api}`)
        .then(response => response.json())
        .then(result => {
            ipAddress.textContent = result.ip;
            userLocation.textContent = result.location.city;
            timezone.textContent = `UTC ${result.location.timezone}`;
            userIsp.textContent = result.isp;
            resultFinal = {
                lat: result.location.lat,
                long: result.location.lng
            }

            if (mapInitialized) {
                console.log(map, marker)
                setMap(map, marker, [resultFinal.lat, resultFinal.long]);

                return;
            }

            let initializeMap = initMap(resultFinal.lat, resultFinal.long);
            map = initializeMap.mymap;
            marker = initializeMap.marker;
            mapInitialized = true;
            console.log(map, marker)
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
    let marker = L.marker([lat, long], { icon: mapIcon }).addTo(mymap);

    //set tileLayer for the map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2hvcnBlZTIzIiwiYSI6ImNsMDg0NzNmdjAwMTgzY3Buc3I2ZTU0emEifQ.mvAT9hcrHp59sVybAzoA6g'
    }).addTo(mymap);

    return {mymap, marker};
}

function setMap (map, marker, coordinates) {
    // console.log(coordinates);
    map.setView(coordinates, 17);
    marker.setLatLng(coordinates);
    return {map, marker};

}

document.addEventListener("DOMContentLoaded", function () {
    getIpAddress();
});
