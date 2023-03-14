const sidebar = document.querySelector(".sidebar");
const content = document.querySelector("#content");
var link = document.querySelector(".has-submenu");
var submenu = document.querySelector(".submenu");
var arrowIcon = link.querySelector(".arrow-icon");
content.style.marginLeft = sidebar.offsetWidth + "px";

var links = document.querySelectorAll(".sidebar a");

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    for (var j = 0; j < links.length; j++) {
      links[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}

link.addEventListener("click", function () {
  submenu.classList.toggle("submenu-visible");
  setTimeout(function () {
    submenu.classList.toggle("animate");
  }, 0);
  arrowIcon.classList.toggle("rotate");
});

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
