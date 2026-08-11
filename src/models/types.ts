import L from 'leaflet';

export type FilterKey = 'all' | 'available' | 'notAvailable' | 'capacity1' | 'capacity2' | 'capacity3' | 'capacity4';
export type CapacityFilterKey = Exclude<FilterKey, 'all' | 'available' | 'notAvailable'>;
export type RoutingControl = L.Routing.Control;
