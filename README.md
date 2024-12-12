# Manifold Stock Bot

A React-based bot that trades on Manifold Markets based on stock price movements. Useful for markets that might be correlated with stock performance.

## Overview

The bot allows you to:

- Monitor any stock ticker (e.g., TSLA, AAPL)
- Trade on Manifold Markets when the stock moves significantly
- Choose whether to trade in the same or opposite direction as the stock

For example, you could:

- Buy NO on "Will Elon Musk do X?" when Tesla stock goes up
- Buy YES on "Will Apple release VR headset?" when AAPL goes up
- etc.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/maxghenis/manifold-stock-bot.git
cd manifold-stock-bot
```

2. Install dependencies:

```bash
npm install
```

3. Get API keys:

- [Manifold API key](https://manifold.markets/profile) (under Edit Profile)
- [Alpha Vantage API key](https://www.alphavantage.co/support/#api-key) for stock data (free tier available)

4. Start the development server:

```bash
npm run dev
```

## Usage

1. Enter your API keys
2. Configure:
   - Stock ticker to monitor (e.g., "TSLA")
   - Market search term (defaults to ticker)
   - Trading direction (Same/Opposite)
   - Bet amount and threshold
3. Click Start Bot

The bot will then:

1. Monitor the stock price at regular intervals
2. When the price changes more than your threshold:
   - Same direction: Stock up → YES, down → NO
   - Opposite direction: Stock up → NO, down → YES
3. Place limit orders at good prices (0.9 for NO, 0.1 for YES)

## Project Structure

```
src/
├── components/           # React components
│   ├── TradingBot.jsx   # Main component
│   ├── ConfigPanel.jsx  # Configuration UI
│   ├── StatusPanel.jsx  # Current status display
│   ├── ControlPanel.jsx # Start/stop controls
│   └── ActivityLog.jsx  # Trading history
├── hooks/
│   └── useTradingBot.js # Trading logic & state
├── services/
│   └── apis.js          # API clients
└── App.jsx              # Root component
```

## Development

The codebase is organized into:

- Reusable UI components
- Custom hooks for logic
- Service modules for API interaction

To add features:

1. For UI changes: Add/modify components
2. For trading logic: Modify useTradingBot.js
3. For new APIs: Add to services/apis.js

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Disclaimer

This bot is for educational purposes. Use at your own risk. Stock movements may or may not predict the outcomes you're betting on.
