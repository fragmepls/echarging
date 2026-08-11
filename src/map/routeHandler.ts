import L, { LeafletEvent, Marker } from 'leaflet';
import {RoutingControl} from '../models/types';
import {UserPosition} from "../models/userPosition";

export function addRouteHandler(marker: Marker, routingControl: RoutingControl | null, userPosition: UserPosition | null): void {
    marker.on('popupopen', (event: LeafletEvent) => {
        const popupElement = (event as L.PopupEvent).popup.getElement();
        const routeLink = popupElement?.querySelector<HTMLAnchorElement>('.marker');

        if (!routeLink) {
            return;
        }

        const handleRouteClick = (clickEvent: MouseEvent) => {
            clickEvent.preventDefault();

            if (!routingControl || !userPosition) {
                return;
            }

            routingControl.setWaypoints([
                L.latLng(userPosition.latitude, userPosition.longitude),
                marker.getLatLng(),
            ]);
        };

        routeLink.addEventListener('click', handleRouteClick, { once: true });
    });
}
