import React, { useEffect } from "react";

const ConfigPanel = ({ config, onChange }) => {
  // When stock ticker changes, suggest looking for related markets
  useEffect(() => {
    if (config.stockTicker && !config.marketSlug) {
      onChange({
        ...config,
        marketSlug: config.stockTicker.toLowerCase(),
      });
    }
  }, [config.stockTicker]);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Manifold API Key
          </label>
          <input
            type="password"
            value={config.manifoldApiKey}
            onChange={(e) =>
              onChange({ ...config, manifoldApiKey: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Stock API Key
          </label>
          <input
            type="password"
            value={config.stockApiKey}
            onChange={(e) =>
              onChange({ ...config, stockApiKey: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock Ticker</label>
          <input
            type="text"
            value={config.stockTicker}
            onChange={(e) =>
              onChange({ ...config, stockTicker: e.target.value.toUpperCase() })
            }
            className="w-full px-3 py-2 border rounded"
            placeholder="TSLA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Direction</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="direction"
                value="same"
                checked={config.direction === "same"}
                onChange={() => onChange({ ...config, direction: "same" })}
                className="mr-2"
              />
              Same
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="direction"
                value="opposite"
                checked={config.direction === "opposite"}
                onChange={() => onChange({ ...config, direction: "opposite" })}
                className="mr-2"
              />
              Opposite
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Market Search Term
          </label>
          <input
            type="text"
            value={config.marketSlug}
            onChange={(e) =>
              onChange({ ...config, marketSlug: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            placeholder="Search term for Manifold market"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Bet Amount (M$)
          </label>
          <input
            type="number"
            value={config.betAmount}
            onChange={(e) =>
              onChange({ ...config, betAmount: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Price Change Threshold (%)
          </label>
          <input
            type="number"
            value={config.priceChangeThreshold}
            onChange={(e) =>
              onChange({
                ...config,
                priceChangeThreshold: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
