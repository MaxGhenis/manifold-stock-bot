// src/services/apis.js
const MANIFOLD_API_BASE = 'https://api.manifold.markets/v0';

export class ManifoldAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async placeBet(amount, contractId, outcome, limitProb = null) {
    const body = { amount, contractId, outcome };
    if (limitProb) body.limitProb = limitProb;

    const response = await fetch(`${MANIFOLD_API_BASE}/bet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${this.apiKey}`
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) throw new Error(`Failed to place bet: ${response.statusText}`);
    return await response.json();
  }

  async getMarketBySlug(slug) {
    const response = await fetch(`${MANIFOLD_API_BASE}/slug/${slug}`);
    if (!response.ok) throw new Error(`Failed to get market: ${response.statusText}`);
    return await response.json();
  }
}

export class StockAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getStockData(ticker) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${this.apiKey}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch stock data');
    
    const data = await response.json();
    if (!data['Global Quote']) {
      throw new Error('Invalid response from stock API');
    }

    return {
      ticker,
      price: parseFloat(data['Global Quote']['05. price']),
      change: parseFloat(data['Global Quote']['09. change']),
      percentChange: parseFloat(data['Global Quote']['10. change percent'].replace('%', ''))
    };
  }
}