import L, {Marker} from "leaflet";

import {ChargingStation} from "../models/chargingStation";
import {UserPosition} from "../models/userPosition";
import {LayerGroups} from "../models/layerGroups";
import {RoutingControl, CapacityFilterKey} from "../models/types";

import {addRouteHandler} from "./routeHandler";

function buildPopup(station: ChargingStation): string {
    const available = station.smetadata?.state === 'ACTIVE' ? 'Available' : 'Not available';
    const address = station.smetadata?.address ?? 'Unknown address';
    const paymentInfo = station.smetadata?.paymentInfo ?? '#';

    return `
    <b>${address}</b><br>
    ${available}<br>
    <a href="${paymentInfo}" target="_blank" rel="noreferrer">Payment information</a><br>
    <a href="#" class="marker">Route</a>
  `;
}

function createMarker(station: ChargingStation, routingControl: RoutingControl | null, userPosition: UserPosition | null): Marker {
    const marker = L.marker([station.scoordinate.y, station.scoordinate.x]);
    marker.bindPopup(buildPopup(station));
    addRouteHandler(marker, routingControl, userPosition);
    return marker;
}

function addMarkerToGroups(
    station: ChargingStation,
    groups: LayerGroups,
    routingControl: RoutingControl | null,
    userPosition: UserPosition | null,
): void {
    const capacity = Number(station.smetadata?.capacity);
    const isAvailable = station.smetadata?.state === 'ACTIVE';

    createMarker(station, routingControl, userPosition).addTo(groups.all);

    if (isAvailable) {
        createMarker(station, routingControl, userPosition).addTo(groups.available);
    } else {
        createMarker(station, routingControl, userPosition).addTo(groups.notAvailable);
    }

    if (capacity >= 1 && capacity <= 4) {
        const capacityKey = `capacity${capacity}` as CapacityFilterKey;
        createMarker(station, routingControl, userPosition).addTo(groups[capacityKey]);
    }
}

export { buildPopup, createMarker, addMarkerToGroups };
