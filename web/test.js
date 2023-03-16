var mymap = L.map("map").setView([52, 10], 5);

var zoomControl = L.control.zoom();
zoomControl.setPosition("topright");
zoomControl.addTo(mymap);

mymap.removeControl(mymap.zoomControl);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

async function getChargingStationData() {
  try {
    const response = await fetch(
      "https://mobility.api.opendatahub.bz.it/v2/tree,node/EChargingStation"
    );
    const jsonObj = await response.json();
    Object.values(jsonObj["data"]["EChargingStation"]["stations"]).forEach(
      (value) => {
        var marker = L.marker([
          value["scoordinate"]["y"],
          value["scoordinate"]["x"],
        ]).addTo(mymap);
        marker.bindPopup(
          "<b>" +
            value["smetadata"]["address"] +
            "</b><br>" +
            "Available: " +
            value["savailable"] +
            "<br>" +
            "Name: " +
            value["sname"]
        );
      }
    );
  } catch (error) {
    console.error(error);
  }
}

getChargingStationData();
