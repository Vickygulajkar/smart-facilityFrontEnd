import type { AlertType } from "../types";

interface Props {
    alerts: AlertType[];
}

const AlertFeed = ({ alerts }: Props) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-red-100 flex flex-col h-[calc(100vh-180px)]">
            <div className="p-4 border-b border-red-50" >
                <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    Critical Alerts
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {alerts.length === 0 ? (
                    <p className="text-gray-400 text-center py-10">No alerts yet</p>
                ) : (
                    alerts.map((alert, index) => (
                        <div
                            key={index}
                            className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <p className="font-bold text-red-800 text-sm">
                                    {alert.type || "System Alert"}
                                </p>
                                <span className="text-[10px] text-red-400 font-mono">
                                    {new Date().toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="text-sm text-red-700 font-medium">
                                {alert.message}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-[10px] bg-red-200 text-red-800 px-1.5 py-0.5 rounded uppercase font-bold">
                                    {alert.deviceId}
                                </span>
                                <span className="text-[10px] text-red-400">
                                    ID: {alert.eventId?.slice(-6)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AlertFeed;