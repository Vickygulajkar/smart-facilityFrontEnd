export interface EventType {
    eventId: string;
    deviceId: string;
    type: string;
    value: number;
    timestamp: number;
}

export interface AlertType {
    deviceId: string;
    type: string;
    message: string;
    eventId: string;
}

export interface RuleType {
    name: string;
    eventType: string;
    operator: string;
    threshold: number;
    consecutiveReadings: number;
}