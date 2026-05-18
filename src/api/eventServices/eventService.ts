import type { RuleType } from "../../types";
import api from "../apiInstance";

export interface CreateEventPayload {
    deviceId: string;
    type: string;
    value: number;
    timestamp: number;
}

export const createEvent = async (eventData: CreateEventPayload) => {
    try {
        const response = await api.post("/events", eventData);
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

export const createRule = async (ruleData: RuleType) => {
    try {
        const response = await api.post("/rules", ruleData);
        return response.data;
    } catch (error) {
        console.error("Error creating rule:", error);
        throw error;
    }
};
