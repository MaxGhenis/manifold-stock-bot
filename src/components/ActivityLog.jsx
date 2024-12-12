import React from "react";

const ActivityLog = ({ logs }) => (
  <div className="border rounded">
    <h2 className="text-lg font-semibold p-4 border-b">Activity Log</h2>
    <div className="h-64 overflow-y-auto p-4">
      {logs.map((log, i) => (
        <div
          key={i}
          className={`text-sm mb-2 ${
            log.type === "error"
              ? "text-red-600"
              : log.type === "success"
              ? "text-green-600"
              : ""
          }`}
        >
          <span className="text-gray-500">
            {new Date(log.time).toLocaleTimeString()}
          </span>
          {" - "}
          {log.message}
        </div>
      ))}
    </div>
  </div>
);

export default ActivityLog;
