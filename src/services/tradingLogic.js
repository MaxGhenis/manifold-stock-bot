import { ManifoldAPI, StockAPI } from './apis';

export class TradingManager {
  constructor(config, onLog) {
    this.config = config;
    this.onLog = onLog;
    this.manifold = new ManifoldAPI(config.manifoldApiKey);
    this.stockApi = new StockAPI(config.stockApiKey);
  }

  log(message, type = 'info') {
    this.onLog?.(message, type);
  }

  async checkAndTrade() {
    // Get Tesla stock data
    const teslaData = await this.stockApi.getTeslaData();
    this.log(`Tesla price: $${teslaData.price.toFixed(2)} (${teslaData.percentChange.toFixed(2)}% change)`);

    // Check if we should trade
    if (Math.abs(teslaData.percentChange) >= this.config.priceChangeThreshold) {
      if (teslaData.percentChange > 0) {
        const market = await this.manifold.getMarketBySlug(this.config.marketSlug);
        this.log(`Placing NO bet...`, 'info');
        
        await this.manifold.placeBet(
          this.config.betAmount,
          market.id,
          'NO',
          0.9 // High limit price for NO bets
        );

        this.log(`Successfully placed NO bet for M$${this.config.betAmount}`, 'success');
      }
    }

    return teslaData;
  }
}