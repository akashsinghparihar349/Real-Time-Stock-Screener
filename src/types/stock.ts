// src/types/stock.ts

export type Sector =
  | 'Banking & Financial Services'
  | 'Information Technology'
  | 'Pharmaceuticals & Healthcare'
  | 'Consumer Goods (FMCG)'
  | 'Automobile & Auto Components'
  | 'Metals & Mining'
  | 'Energy (Oil, Gas, Power)'
  | 'Real Estate & Construction'
  | 'Telecom & Media'
  | 'Infrastructure & Capital Goods'
  | 'Chemicals & Fertilisers'
  | 'Others';

export type MarketCapCategory = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Micro Cap';

export interface Stock {
  symbol: string;
  companyName: string;
  sector: Sector;
  industry: string;
  marketCapCategory: MarketCapCategory;
  indexMembership: string[];

  // Price data
  lastPrice: number;
  previousClose: number;
  dayOpen: number;
  dayHigh: number;
  dayLow: number;
  changePercent: number;
  changeAbsolute: number;
  volume: number;
  avgVolume20D: number;
  week52High: number;
  week52Low: number;
  week52HighProximity: number; // % proximity to 52w high
  week52LowProximity: number;  // % proximity to 52w low

  // Fundamentals
  marketCap: number; // In INR Crores
  pe: number | null;
  pb: number;
  dividendYield: number; // in %
  eps: number;
  roe: number; // in %
  roce: number; // in %
  debtToEquity: number;
  currentRatio: number;
  promoterHolding: number; // in %
  revenueGrowthYoY: number; // in %
  profitGrowthYoY: number; // in %

  // Technical
  rsi14: number;
  sma50: number;
  sma200: number;
  beta: number;
  atr: number;
  macdSignal: 'Bullish' | 'Bearish' | 'Neutral';
  bollingerPosition: 'Above' | 'Within' | 'Below';
  volumeVsAvg: 'Below' | 'Above' | '2x' | '3x';

  // Simulation & metadata
  volatility?: number;
  lastUpdated?: number;
}

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'between'
  | 'in'
  | 'notIn'
  | 'contains'
  | 'startsWith';

export type FilterValue = number | string | boolean | (number | string)[] | null;

export interface FilterConfig {
  id: string;
  field: keyof Stock;
  operator: FilterOperator;
  value: FilterValue;
  enabled: boolean;
  label?: string;
  category?: 'Fundamentals' | 'Market Data' | 'Classification' | 'Technical' | 'Custom';
}

export interface SortConfig {
  column: keyof Stock;
  direction: 'asc' | 'desc';
}

export interface OHLCV {
  time: number; // Unix timestamp in seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceUpdate {
  symbol: string;
  lastPrice: number;
  changePercent: number;
  changeAbsolute: number;
  volume: number;
  high?: number;
  low?: number;
  timestamp: number;
  candle?: OHLCV;
}

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: FilterConfig[];
  isCustom?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: {
    total: number;
    page: number;
    pageSize: number;
    timestamp: string;
    executionTimeMs: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface TechnicalIndicatorConfig {
  sma20: boolean;
  sma50: boolean;
  sma200: boolean;
  ema12: boolean;
  ema26: boolean;
  bollingerBands: boolean;
  rsi: boolean;
  volumeProfile: boolean;
}
