type StationState = 'ACTIVE' | string;

export interface ChargingStation {
    scoordinate: {
        x: number;
        y: number;
    };
    smetadata?: {
        state?: StationState;
        address?: string;
        paymentInfo?: string;
        capacity?: string | number;
    };
}
