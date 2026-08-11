import {useEffect, useRef, useState, type ReactElement} from 'react';
import L, {
    type Map as LeafletMap,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {geocoders} from 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

import {ChargingStation} from "./models/chargingStation";
import {UserPosition} from "./models/userPosition";
import {LayerGroups} from "./models/layerGroups";

import {FilterKey, RoutingControl} from "./models/types";
import {MAP_CENTER, MAP_BOUNDS, FILTERS} from "./constants/MapConstants";

import {removeLayerGroups, createLayerGroups, showLayerGroup} from "./map/layerGroup";
import Sidebar from "./components/Sidebar";

export default function App(): ReactElement {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<LeafletMap | null>(null);
    const routingControlRef = useRef<RoutingControl | null>(null);
    const layerGroupsRef = useRef<LayerGroups | null>(null);

    const [activeFilter, setActiveFilter] = useState<FilterKey>(FILTERS.all);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [availabilityOpen, setAvailabilityOpen] = useState(true);
    const [capacityOpen, setCapacityOpen] = useState(true);
    const [stations, setStations] = useState<ChargingStation[]>([]);
    const [userPosition, setUserPosition] = useState<UserPosition | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setUserPosition(null);
            },
        );
    }, []);

    useEffect(() => {
        const mapContainer = mapRef.current;

        if (!mapContainer || mapInstanceRef.current) {
            return;
        }

        const map = L.map(mapContainer, {
            maxBounds: MAP_BOUNDS,
            minZoom: 6,
            maxZoom: 18,
        }).setView(MAP_CENTER, 7);

        map.zoomControl.setPosition('bottomright');

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        const routingControl = L.Routing.control({
            waypoints: userPosition ? [L.latLng(userPosition.latitude, userPosition.longitude)] : [],
            routeWhileDragging: true,
            addWaypoints: true,
            altLineOptions: {
                extendToWaypoints: true,
                missingRouteTolerance: 10,
            },
            show: true,
            collapsible: true,
            geocoder: geocoders.nominatim(),
        }).addTo(map);

        mapInstanceRef.current = map;
        routingControlRef.current = routingControl;

        return () => {
            routingControl.remove();
            map.remove();
            mapInstanceRef.current = null;
            routingControlRef.current = null;
        };
    }, [userPosition]);

    useEffect(() => {
        const map = mapInstanceRef.current;
        const routingControl = routingControlRef.current;

        if (routingControl && userPosition) {
            routingControl.setWaypoints([L.latLng(userPosition.latitude, userPosition.longitude)]);
        }

        if (!map) {
            return;
        }

        if (layerGroupsRef.current) {
            removeLayerGroups(map, layerGroupsRef.current);
        }

        const groups = createLayerGroups(stations, routingControl, userPosition);
        layerGroupsRef.current = groups;
        showLayerGroup(map, groups, activeFilter);
    }, [activeFilter, stations, userPosition]);

    useEffect(() => {
        let cancelled = false;

        async function getStations(): Promise<void> {
            const response = await fetch('https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation/*');

            if (!response.ok) {
                throw new Error(`Failed to load charging stations: ${response.status}`);
            }

            const json: { data?: Record<string, ChargingStation> } = await response.json();

            if (!cancelled) {
                setStations(Object.values(json.data ?? {}));
            }
        }

        return () => {
            cancelled = true;
        };
    }, []);

    const selectFilter = (filter: FilterKey): void => {
        setActiveFilter(filter);
    };

    return (
        <>
            <div className="ontop">
                <button
                    type="button"
                    className="menu-btn"
                    onClick={() => setSidebarOpen(true)}
                    style={{visibility: sidebarOpen ? 'hidden' : 'visible'}}
                    aria-label="Open menu"
                >
                    <i className="fas fa-bars"/>
                </button>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} availabilityOpen={availabilityOpen}
                         setAvailabilityOpen={setAvailabilityOpen} capacityOpen={capacityOpen}
                         setCapacityOpen={setCapacityOpen} selectFilter={selectFilter}/>
            </div>
            <div id="map" ref={mapRef}/>
        </>
    );
}
