import L, {Map as LeafletMap} from "leaflet";

import {LayerGroups} from "../models/layerGroups";
import {ChargingStation} from "../models/chargingStation";
import {UserPosition} from "../models/userPosition";
import {FilterKey, RoutingControl} from "../models/types";

import {addMarkerToGroups} from "./marker";

function createLayerGroups(
    stations: ChargingStation[],
    routingControl: RoutingControl | null,
    userPosition: UserPosition | null,
): LayerGroups {
    const groups: LayerGroups = {
        all: L.layerGroup(),
        available: L.layerGroup(),
        notAvailable: L.layerGroup(),
        capacity1: L.layerGroup(),
        capacity2: L.layerGroup(),
        capacity3: L.layerGroup(),
        capacity4: L.layerGroup(),
    };

    stations.forEach((station) => {
        addMarkerToGroups(station, groups, routingControl, userPosition);
    });

    return groups;
}

function removeLayerGroups(map: LeafletMap, groups: LayerGroups): void {
    Object.values(groups).forEach((group) => {
        if (map.hasLayer(group)) {
            map.removeLayer(group);
        }
    });
}

function showLayerGroup(map: LeafletMap, groups: LayerGroups, filter: FilterKey): void {
    removeLayerGroups(map, groups);

    const activeGroup = groups[filter];
    if (activeGroup) {
        activeGroup.addTo(map);
    }
}

export { createLayerGroups, removeLayerGroups, showLayerGroup };

