import React from "react";

const ControlPanel = ({ isRunning, onToggle }) => (
  <div className="flex gap-4 mb-4">
    <button
      className={`px-4 py-2 rounded ${
        isRunning ? "bg-red-500" : "bg-green-500"
      } text-white`}
      onClick={onToggle}
    >
      {isRunning ? "Stop Bot" : "Start Bot"}
    </button>
  </div>
);

export default ControlPanel;
