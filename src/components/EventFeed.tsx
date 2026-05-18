import type { EventType } from "../types";

interface Props {
    events: EventType[];
}

const EventFeed = ({ events }: Props) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-[calc(100vh-180px)]">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Event Stream
                </h2>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-mono">
                    {events.length} events
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <p>Waiting for incoming data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-100 p-3 rounded-lg hover:border-blue-300 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">
                                        {event.type}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-mono">
                                        {new Date(event.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Device ID</p>
                                        <p className="text-sm font-bold text-gray-700">{event.deviceId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-1">Reading</p>
                                        <p className="text-lg font-black text-gray-900 leading-none">
                                            {event.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventFeed;