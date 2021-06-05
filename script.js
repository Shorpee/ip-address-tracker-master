document.addEventListener("DOMContentLoaded", function () {
    const latitude = 344;
    const longitude = 355;

    //set initial view of the map
    var mymap = L.map('mapid').setView([6.5244, 3.3792], 13);

    //change marker icon
    var mapIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 40]
    });
    L.marker([6.5525, 3.3870], {icon: mapIcon}).addTo(mymap);

    //set tileLayer for the map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        // zoomControl: false,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2hvcnBlZTIzIiwiYSI6ImNrcGc3dXJqcTAxcWsyb244bXhqdHd6NmIifQ.-dJep14NhquKkNfvx2lrBg'
    }).addTo(mymap);
    // L.control.attribution('false');
});