var mymap = L.map("map").setView([52, 10], 6);
const allMarkers = L.layerGroup();
const italyMarkers = L.layerGroup();
const austriaMarkers = L.layerGroup();
const switzerlandMarkers = L.layerGroup();
const germanyMarkers = L.layerGroup();
const denmarkMarkers = L.layerGroup();
const layers = [italyMarkers, austriaMarkers, switzerlandMarkers, germanyMarkers, denmarkMarkers];
const countries = ["IT", "AT", "CH", "DE", "DK"];

var zoomControl = L.control.zoom();
zoomControl.setPosition("bottomright");
zoomControl.addTo(mymap);

mymap.removeControl(mymap.zoomControl);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

var control = L.Routing.control({
  routeWhileDragging: true,
  addWaypoints: true,
  dragWaypoints: true,
  altLineOptions: true,
  showInstructions: true,
  show: true,
  collapsible: true,
  geocoder: L.Control.Geocoder.nominatim(),
}).addTo(mymap);

async function getJson() {
  try {
    const response = await fetch("https://mobility.api.opendatahub.bz.it/v2/tree,node/EChargingStation");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function setAllCountryMarkers() {
  jsonObj = await getJson();
  Object.values(jsonObj["data"]["EChargingStation"]["stations"]).forEach((value) => {
    var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(allMarkers);
    marker.bindPopup(
      "<b>" +
        value["smetadata"]["address"] +
        "</b><br>" +
        "Available: " +
        value["savailable"] +
        "<br>" +
        "Name: " +
        value["sname"] +
        "<br>" +
        "Link: <a href='https://maps.google.com/?q=" +
        value["scoordinate"]["y"] +
        "," +
        value["scoordinate"]["x"] +
        "'>" +
        value["scoordinate"]["y"] +
        ", " +
        value["scoordinate"]["x"] +
        "</a>"
    );
  });
  allMarkers.addTo(mymap);
}

setAllCountryMarkers();

async function setCountryMarkers() {
  jsonObj = await getJson();
  Object.values(jsonObj["data"]["EChargingStation"]["stations"]).forEach((value) => {
    const y = value["scoordinate"]["y"];
    const x = value["scoordinate"]["x"];
    const url = `http://api.geonames.org/countryCode?lat=${y}&lng=${x}&username=fragmepls`;
    fetch(url)
      .then((data) => {
        console.log(data == countries[i]);
        // if (data == (countries[i])) {
        //   var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(layers[i]);
        //   marker.bindPopup(
        //     "<b>" +
        //       value["smetadata"]["address"] +
        //       "</b><br>" +
        //       "Available: " +
        //       value["savailable"] +
        //       "<br>" +
        //       "Name: " +
        //       value["sname"] +
        //       "<br>" +
        //       "Link: <a href='https://maps.google.com/?q=" +
        //       value["scoordinate"]["y"] +
        //       "," +
        //       value["scoordinate"]["x"] +
        //       "'>" +
        //       value["scoordinate"]["y"] +
        //       ", " +
        //       value["scoordinate"]["x"] +
        //       "</a>"
        //   );
        // }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  });
}

setCountryMarkers();

document.querySelector(".all-link").addEventListener("click", function () {
  mymap.removeLayer(italyMarkers);
  mymap.removeLayer(austriaMarkers);
  mymap.removeLayer(switzerlandMarkers);
  mymap.removeLayer(germanyMarkers);
  mymap.removeLayer(denmarkMarkers);
  allMarkers.addTo(mymap);
});

document.querySelector(".italy-link").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(austriaMarkers);
  mymap.removeLayer(switzerlandMarkers);
  mymap.removeLayer(germanyMarkers);
  mymap.removeLayer(denmarkMarkers);
  italyMarkers.addTo(mymap);
});

document.querySelector(".austria-link").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(italyMarkers);
  mymap.removeLayer(switzerlandMarkers);
  mymap.removeLayer(germanyMarkers);
  mymap.removeLayer(denmarkMarkers);
  austriaMarkers.addTo(mymap);
});

document.querySelector(".switzerland-link").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(italyMarkers);
  mymap.removeLayer(austriaMarkers);
  mymap.removeLayer(germanyMarkers);
  mymap.removeLayer(denmarkMarkers);
  switzerlandMarkers.addTo(mymap);
});

document.querySelector(".germany-link").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(italyMarkers);
  mymap.removeLayer(austriaMarkers);
  mymap.removeLayer(switzerlandMarkers);
  mymap.removeLayer(denmarkMarkers);
  germanyMarkers.addTo(mymap);
});

document.querySelector(".denmark-link").addEventListener("click", function () {
  mymap.removeLayer(allMarkers);
  mymap.removeLayer(italyMarkers);
  mymap.removeLayer(austriaMarkers);
  mymap.removeLayer(switzerlandMarkers);
  mymap.removeLayer(germanyMarkers);
  denmarkMarkers.addTo(mymap);
});

const links = document.querySelectorAll(".country-link");
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const country = link.dataset.country;
    filterMarkersByCountry(country);
  });
});
