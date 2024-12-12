import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/Alert";
import ConfigPanel from "./ConfigPanel";
import StatusPanel from "./StatusPanel";
import ControlPanel from "./ControlPanel";
import ActivityLog from "./ActivityLog";
import { useTradingBot } from "../hooks/useTradingBot";

const TradingBot = () => {
  const { config, setConfig, status, setStatus, logs } = useTradingBot();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock-Manifold Trading Bot</h1>

      {status.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{status.error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 mb-4">
        <ConfigPanel config={config} onChange={setConfig} />
        <StatusPanel status={status} />
      </div>

      <ControlPanel
        isRunning={status.isRunning}
        onToggle={() =>
          setStatus((prev) => ({ ...prev, isRunning: !prev.isRunning }))
        }
      />

      <ActivityLog logs={logs} />
    </div>
  );
};

export default TradingBot;
