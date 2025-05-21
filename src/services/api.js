// Mock API data
const mockHoldings = [
  {
    coin: "ETH",
    coinName: "Ethereum",
    logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    currentPrice: 216182,
    totalHolding: 0.5,
    averageBuyPrice: 190000,
    stcg: { balance: 0.5, gain: -10000 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "SOL",
    coinName: "Solana",
    logo: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1696504774",
    currentPrice: 14758.01,
    totalHolding: 10,
    averageBuyPrice: 18000,
    stcg: { balance: 10, gain: -3000 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "BNB",
    coinName: "BNB",
    logo: "https://coin-images.coingecko.com/coins/images/825/large/binance-coin-logo.png?1696501970",
    currentPrice: 665.55,
    totalHolding: 5,
    averageBuyPrice: 700,
    stcg: { balance: 5, gain: -150 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "AAVE",
    coinName: "Aave",
    logo: "https://coin-images.coingecko.com/coins/images/12645/large/AAVE.png?1696512452",
    currentPrice: 224.33,
    totalHolding: 2,
    averageBuyPrice: 300,
    stcg: { balance: 2, gain: -150 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "USDC",
    coinName: "USDC",
    logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    currentPrice: 85.41,
    totalHolding: 1000,
    averageBuyPrice: 80,
    stcg: { balance: 1000, gain: 5410 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "MATIC",
    coinName: "Polygon",
    logo: "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745",
    currentPrice: 22.22,
    totalHolding: 200,
    averageBuyPrice: 15,
    stcg: { balance: 200, gain: 1444 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "LINK",
    coinName: "Chainlink",
    logo: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
    currentPrice: 1450.14,
    totalHolding: 10,
    averageBuyPrice: 1200,
    stcg: { balance: 10, gain: 2501.4 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "BTC",
    coinName: "Bitcoin",
    logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    currentPrice: 3000000,
    totalHolding: 0.1,
    averageBuyPrice: 2500000,
    stcg: { balance: 0.1, gain: 50000 },
    ltcg: { balance: 0, gain: 0 }
  },
  // More assets for view all
  {
    coin: "UNI",
    coinName: "Uniswap",
    logo: "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png?1696512450",
    currentPrice: 600,
    totalHolding: 20,
    averageBuyPrice: 500,
    stcg: { balance: 20, gain: 2000 },
    ltcg: { balance: 0, gain: 0 }
  },
  {
    coin: "DOGE",
    coinName: "Dogecoin",
    logo: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    currentPrice: 10,
    totalHolding: 1000,
    averageBuyPrice: 5,
    stcg: { balance: 1000, gain: 5000 },
    ltcg: { balance: 0, gain: 0 }
  }
];

const mockCapitalGains = {
  capitalGains: {
    stcg: {
      profits: 70200.88,
      losses: 1548.53
    },
    ltcg: {
      profits: 5020,
      losses: 3050
    },
  }
};

export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHoldings);
    }, 500);
  });
};

export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCapitalGains);
    }, 500);
  });
}; 