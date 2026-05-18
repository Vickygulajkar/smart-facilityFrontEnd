import { useState } from "react";
import { createRule } from "../api/eventServices/eventService";
import toast from "react-hot-toast";


const RuleForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        eventType: "temperature",
        operator: ">",
        threshold: 0,
        consecutiveReadings: 1,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["threshold", "consecutiveReadings"].includes(name) ? parseFloat(value) : value,
        }));
    };

    const handleCreateRule = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createRule(formData);
            toast.success("Rule Created Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create rule");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4 text-purple-600">
                Create Automation Rule
            </h2>

            <form onSubmit={handleCreateRule} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g., High Temp Alert"
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                        <select
                            name="eventType"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                            onChange={handleChange}
                            value={formData.eventType}
                        >
                            <option value="temperature">Temperature</option>
                            <option value="vibration">Vibration</option>
                            <option value="motion">Motion</option>
                            <option value="humidity">Humidity</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                        <select
                            name="operator"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                            onChange={handleChange}
                        >
                            <option value=">">{">"}</option>
                            <option value="<">{"<"}</option>
                            <option value="==">{"=="}</option>
                            <option value=">=">{">="}</option>
                            <option value="<=">{"<="}</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
                        <input
                            type="number"
                            name="threshold"
                            required
                            placeholder="Value"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Consecutive</label>
                        <input
                            type="number"
                            name="consecutiveReadings"
                            required
                            min="1"
                            placeholder="Readings"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-purple-600 text-white px-4 py-2 rounded font-semibold transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
                    }`}
                >
                    {loading ? "Creating..." : "Create Rule"}
                </button>
            </form>
        </div>
    );
};

export default RuleForm;