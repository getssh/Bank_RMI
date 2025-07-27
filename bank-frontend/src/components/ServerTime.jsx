import { useState } from "react";
import { getServerTime } from "../api/bankApi";

export default function ServerTime() {
  const [timeInfo, setTimeInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchServerTime = async () => {
    setLoading(true);
    try {
      const data = await getServerTime();
      setTimeInfo(data);
    } catch (error) {
      console.error("Error fetching server time:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">Server Time</h3>
        <button
          onClick={fetchServerTime}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Get Server Time"}
        </button>
      </div>
      
      {timeInfo && (
        <div className="bg-white p-3 rounded border">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Date:</span> {timeInfo.date}</div>
            <div><span className="font-medium">Time:</span> {timeInfo.time}</div>
            <div><span className="font-medium">DateTime:</span> {timeInfo.dateTime}</div>
            <div><span className="font-medium">Timestamp:</span> {timeInfo.timestamp}</div>
          </div>
        </div>
      )}
    </div>
  );
} 