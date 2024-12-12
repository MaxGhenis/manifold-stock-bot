import { useState, useEffect } from 'react';
import { ManifoldAPI, StockAPI } from '../services/apis';

export const DEFAULT_CONFIG = {
  manifoldApiKey: '',
  stockApiKey: '',
  stockTicker: 'TSLA',
  marketSlug: 'tsla',
  betAmount: 100,
  priceChangeThreshold: 2,
  checkInterval: 60,
  direction: 'opposite'
};

export function useTradingBot() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [status, setStatus] = useState({
    isRunning: false,
    lastCheck: null,
    error: null,
    stockPrice: null,
    stockChange: null
  });
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [{
      time: new Date().toISOString(),
      message,
      type
    }, ...prev].slice(0, 100));
  };

  const determineTrade = (percentChange) => {
    const absChange = Math.abs(percentChange);
    if (absChange < config.priceChangeThreshold) return null;

    const stockUp = percentChange > 0;
    return config.direction === 'same' 
      ? (stockUp ? 'YES' : 'NO')
      : (stockUp ? 'NO' : 'YES');
  };

  const getLimitProb = (outcome) => {
    return outcome === 'NO' ? 0.9 : 0.1;
  };

  const checkAndTrade = async () => {
    try {
      const manifold = new ManifoldAPI(config.manifoldApiKey);
      const stockApi = new StockAPI(config.stockApiKey);

      const stockData = await stockApi.getStockData(config.stockTicker);
      setStatus(prev => ({ 
        ...prev, 
        stockPrice: stockData.price,
        stockChange: stockData.percentChange 
      }));

      addLog(`${stockData.ticker} price: $${stockData.price.toFixed(2)} (${stockData.percentChange.toFixed(2)}% change)`);

      const tradeOutcome = determineTrade(stockData.percentChange);
      if (tradeOutcome) {
        const market = await manifold.getMarketBySlug(config.marketSlug);
        addLog(`Stock moved ${stockData.percentChange > 0 ? 'up' : 'down'} significantly. Placing ${tradeOutcome} bet...`, 'info');
        
        await manifold.placeBet(
          config.betAmount,
          market.id,
          tradeOutcome,
          getLimitProb(tradeOutcome)
        );

        addLog(`Successfully placed ${tradeOutcome} bet for M$${config.betAmount}`, 'success');
      }

      setStatus(prev => ({ ...prev, lastCheck: new Date(), error: null }));
    } catch (error) {
      console.error('Trading error:', error);
      setStatus(prev => ({ ...prev, error: error.message }));
      addLog(`Error: ${error.message}`, 'error');
    }
  };

  useEffect(() => {
    let interval;
    if (status.isRunning) {
      checkAndTrade();
      interval = setInterval(checkAndTrade, config.checkInterval * 1000);
    }
    return () => clearInterval(interval);
  }, [status.isRunning, config]);

  return {
    config,
    setConfig,
    status,
    setStatus,
    logs
  };
}