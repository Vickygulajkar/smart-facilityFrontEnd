import { useEffect, useState } from "react";
import EventFeed from "../components/EventFeed";
import AlertFeed from "../components/AlertFeed";
import RuleForm from "../components/RuleForm";
import EventForm from "../components/EventForm";
import socket from "../sockets/socket";
import type { AlertType, EventType } from "../types";
import { Toaster } from "react-hot-toast";


const Dashboard = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [alerts, setAlerts] = useState<AlertType[]>([]);

    useEffect(() => {

        socket.on("new-event", (data) => {

            setEvents((prev) => [data, ...prev]);
        });

        socket.on("new-alert", (data) => {

            setAlerts((prev) => [data, ...prev]);
        });

        return () => {
            socket.off("new-event");
            socket.off("new-alert");
        };

    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Toaster position="top-right" />
            
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Smart Facility Monitor</h1>
                <p className="text-gray-600 text-sm mt-1">Real-time edge event processing engine</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <EventForm />
                    <RuleForm />
                </div>

                <div className="lg:col-span-2">
                    <EventFeed events={events} />
                </div>

                <div className="lg:col-span-1">
                    <AlertFeed alerts={alerts} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;