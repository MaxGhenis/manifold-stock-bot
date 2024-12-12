import React from "react";

const StatusPanel = ({ status }) => (
  <div className="p-4 border rounded">
    <h2 className="text-lg font-semibold mb-2">Status</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="font-medium">Current Price:</span>
        <span className="ml-2">
          {status.stockPrice ? `$${status.stockPrice.toFixed(2)}` : "N/A"}
        </span>
      </div>
      <div>
        <span className="font-medium">Price Change:</span>
        <span className="ml-2">
          {status.stockChange ? `${status.stockChange.toFixed(2)}%` : "N/A"}
        </span>
      </div>
      <div>
        <span className="font-medium">Last Check:</span>
        <span className="ml-2">
          {status.lastCheck ? status.lastCheck.toLocaleTimeString() : "Never"}
        </span>
      </div>
    </div>
  </div>
);

export default StatusPanel;
