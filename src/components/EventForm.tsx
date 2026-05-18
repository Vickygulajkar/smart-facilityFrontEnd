import { useState } from "react";
import { createEvent } from "../api/eventServices/eventService";
import toast from "react-hot-toast";

const EventForm = () => {
    const [formData, setFormData] = useState({
        deviceId: "",
        type: "temperature",
        value: 0,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "value" ? parseFloat(value) : value,
        }));
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                timestamp: Date.now(),
            };
            await createEvent(payload);
            toast.success("Event created successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
                Simulate Event
            </h2>

            <form onSubmit={handleCreateEvent} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Device ID
                    </label>
                    <input
                        type="text"
                        name="deviceId"
                        required
                        placeholder="e.g., sensor-123"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.deviceId}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Type
                    </label>
                    <select
                        name="type"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="temperature">Temperature</option>
                        <option value="vibration">Vibration</option>
                        <option value="motion">Motion</option>
                        <option value="humidity">Humidity</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value
                    </label>
                    <input
                        type="number"
                        name="value"
                        required
                        placeholder="Value"
                        step="0.1"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.value}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Sending..." : "Send Event"}
                </button>
            </form>
        </div>
    );
};

export default EventForm;
