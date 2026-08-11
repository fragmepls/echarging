import L, {LatLngExpression} from "leaflet";

import {FilterKey, RoutingControl} from "../models/types";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const iconPrototype = L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string };
delete iconPrototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MAP_CENTER: LatLngExpression = [44, 13];
const MAP_BOUNDS = L.latLngBounds(L.latLng(34.5, -17.2), L.latLng(71.5, 56.2));

const FILTERS: Record<Exclude<FilterKey, 'all'> | 'all', FilterKey> = {
    all: 'all',
    available: 'available',
    notAvailable: 'notAvailable',
    capacity1: 'capacity1',
    capacity2: 'capacity2',
    capacity3: 'capacity3',
    capacity4: 'capacity4',
};

export { MAP_CENTER, MAP_BOUNDS, FILTERS };
