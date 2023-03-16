var mymap = L.map("map").setView([52, 10], 5);

var zoomControl = L.control.zoom();
zoomControl.setPosition("bottomright");
zoomControl.addTo(mymap);

mymap.removeControl(mymap.zoomControl);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

var control = L.Routing.control({
  waypoints: [L.latLng(51.5, -0.1), L.latLng(51.51, -0.12)],
  routeWhileDragging: true,
  addWaypoints: true,
  dragWaypoints: true,
  altLineOptions: true,
  showInstructions: true,
  geocoder: L.Control.Geocoder.nominatim(),
}).addTo(mymap);

async function getChargingStationData() {
  try {
    const response = await fetch("https://mobility.api.opendatahub.bz.it/v2/tree,node/EChargingStation");
    const jsonObj = await response.json();
    Object.values(jsonObj["data"]["EChargingStation"]["stations"]).forEach((value) => {
      var marker = L.marker([value["scoordinate"]["y"], value["scoordinate"]["x"]]).addTo(mymap);
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
  } catch (error) {
    console.error(error);
  }
}

getChargingStationData();
