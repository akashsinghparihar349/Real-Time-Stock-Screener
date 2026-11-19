// src/lib/indicators.ts
import { OHLCV } from '@/types/stock';

export interface IndicatorPoint {
  time: number;
  value: number;
}

export interface BollingerPoint {
  time: number;
  upper: number;
  middle: number;
  lower: number;
}

export interface VolumeProfileBucket {
  priceMin: number;
  priceMax: number;
  priceMid: number;
  volume: number;
  percentage: number;
}

/**
 * Simple Moving Average (SMA)
 * SMA(n, t) = (1/n) * Σ(i=0 to n-1) Close(t-i)
 * Undefined for bars where t < n - 1
 */
export function calculateSMA(prices: number[], period: number): (number | undefined)[] {
  const result: (number | undefined)[] = new Array(prices.length).fill(undefined);
  if (prices.length < period || period <= 0) return result;

  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += prices[i];
  }
  result[period - 1] = Math.round((sum / period) * 1000) / 1000;

  for (let i = period; i < prices.length; i++) {
    sum += prices[i] - prices[i - period];
    result[i] = Math.round((sum / period) * 1000) / 1000;
  }

  return result;
}

/**
 * Exponential Moving Average (EMA)
 * Multiplier k = 2 / (n + 1)
 * Initial EMA(n, n-1) = SMA(n, n-1)
 * Recursive: EMA(n, t) = Close(t) * k + EMA(n, t-1) * (1 - k)
 */
export function calculateEMA(prices: number[], period: number): (number | undefined)[] {
  const result: (number | undefined)[] = new Array(prices.length).fill(undefined);
  if (prices.length < period || period <= 0) return result;

  const k = 2 / (period + 1);

  // Initial EMA is SMA of the first `period` bars
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += prices[i];
  }
  let prevEMA = sum / period;
  result[period - 1] = Math.round(prevEMA * 1000) / 1000;

  for (let i = period; i < prices.length; i++) {
    const currentEMA = prices[i] * k + prevEMA * (1 - k);
    result[i] = Math.round(currentEMA * 1000) / 1000;
    prevEMA = currentEMA;
  }

  return result;
}

/**
 * Bollinger Bands
 * Middle Band MB(t) = SMA(20, t)
 * σ(t) = sqrt((1/20) * Σ(i=0 to 19) (Close(t-i) - SMA(20, t))²) [population std dev]
 * Upper Band UB(t) = MB(t) + multiplier * σ(t)
 * Lower Band LB(t) = MB(t) - multiplier * σ(t)
 */
export function calculateBollingerBands(
  prices: number[],
  period: number = 20,
  multiplier: number = 2
): {
  upper: (number | undefined)[];
  middle: (number | undefined)[];
  lower: (number | undefined)[];
} {
  const upper: (number | undefined)[] = new Array(prices.length).fill(undefined);
  const middle: (number | undefined)[] = new Array(prices.length).fill(undefined);
  const lower: (number | undefined)[] = new Array(prices.length).fill(undefined);

  if (prices.length < period || period <= 0) {
    return { upper, middle, lower };
  }

  const sma = calculateSMA(prices, period);

  for (let t = period - 1; t < prices.length; t++) {
    const mb = sma[t];
    if (mb === undefined) continue;

    let varianceSum = 0;
    for (let i = 0; i < period; i++) {
      const diff = prices[t - i] - mb;
      varianceSum += diff * diff;
    }
    // Financial convention uses population standard deviation (divide by n)
    const stdDev = Math.sqrt(varianceSum / period);

    middle[t] = mb;
    upper[t] = Math.round((mb + multiplier * stdDev) * 1000) / 1000;
    lower[t] = Math.round((mb - multiplier * stdDev) * 1000) / 1000;
  }

  return { upper, middle, lower };
}

/**
 * Relative Strength Index (RSI)
 * Wilder's smoothed method
 * Δ(t) = Close(t) - Close(t-1)
 * First average: AvgGain(14) = mean of first 14 gains, AvgLoss(14) = mean of first 14 losses
 * Subsequent: AvgGain(t) = (AvgGain(t-1) * 13 + Gain(t)) / 14
 * RS = AvgGain / AvgLoss
 * RSI = 100 - (100 / (1 + RS))
 * Edge cases: AvgLoss = 0 => 100, AvgGain = 0 => 0
 */
export function calculateRSI(prices: number[], period: number = 14): (number | undefined)[] {
  const result: (number | undefined)[] = new Array(prices.length).fill(undefined);
  if (prices.length <= period || period <= 0) return result;

  const gains: number[] = [];
  const losses: number[] = [];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(Math.max(change, 0));
    losses.push(Math.abs(Math.min(change, 0)));
  }

  // First average (index period - 1 in gains array, which corresponds to index `period` in prices)
  let avgGain = 0;
  let avgLoss = 0;
  for (let i = 0; i < period; i++) {
    avgGain += gains[i];
    avgLoss += losses[i];
  }
  avgGain /= period;
  avgLoss /= period;

  if (avgLoss === 0) {
    result[period] = 100;
  } else if (avgGain === 0) {
    result[period] = 0;
  } else {
    const rs = avgGain / avgLoss;
    result[period] = Math.round((100 - 100 / (1 + rs)) * 100) / 100;
  }

  // Subsequent smoothed averages
  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

    const priceIndex = i + 1;
    if (avgLoss === 0) {
      result[priceIndex] = 100;
    } else if (avgGain === 0) {
      result[priceIndex] = 0;
    } else {
      const rs = avgGain / avgLoss;
      result[priceIndex] = Math.round((100 - 100 / (1 + rs)) * 100) / 100;
    }
  }

  return result;
}

/**
 * Volume Profile
 * Aggregates volume by price buckets across visible candles.
 */
export function calculateVolumeProfile(candles: OHLCV[], bucketsCount: number = 36): VolumeProfileBucket[] {
  if (candles.length === 0 || bucketsCount <= 0) return [];

  let minPrice = Infinity;
  let maxPrice = -Infinity;

  for (const c of candles) {
    if (c.low < minPrice) minPrice = c.low;
    if (c.high > maxPrice) maxPrice = c.high;
  }

  if (minPrice === maxPrice || !isFinite(minPrice) || !isFinite(maxPrice)) {
    return [];
  }

  const bucketSize = (maxPrice - minPrice) / bucketsCount;
  const buckets: { priceMin: number; priceMax: number; priceMid: number; volume: number }[] = [];

  for (let i = 0; i < bucketsCount; i++) {
    const bMin = minPrice + i * bucketSize;
    const bMax = bMin + bucketSize;
    buckets.push({
      priceMin: bMin,
      priceMax: bMax,
      priceMid: (bMin + bMax) / 2,
      volume: 0,
    });
  }

  let totalVolume = 0;

  for (const candle of candles) {
    const cLow = candle.low;
    const cHigh = candle.high;
    const candleSpan = Math.max(0.001, cHigh - cLow);

    // Determine overlapping buckets
    const startIdx = Math.max(0, Math.min(bucketsCount - 1, Math.floor((cLow - minPrice) / bucketSize)));
    const endIdx = Math.max(0, Math.min(bucketsCount - 1, Math.floor((cHigh - minPrice) / bucketSize)));

    const numBucketsSpanned = Math.max(1, endIdx - startIdx + 1);
    const volumePerBucket = candle.volume / numBucketsSpanned;

    for (let b = startIdx; b <= endIdx; b++) {
      buckets[b].volume += volumePerBucket;
      totalVolume += volumePerBucket;
    }
  }

  let maxBucketVolume = 0;
  for (const b of buckets) {
    if (b.volume > maxBucketVolume) maxBucketVolume = b.volume;
  }

  return buckets.map((b) => ({
    priceMin: Math.round(b.priceMin * 100) / 100,
    priceMax: Math.round(b.priceMax * 100) / 100,
    priceMid: Math.round(b.priceMid * 100) / 100,
    volume: Math.round(b.volume),
    percentage: maxBucketVolume > 0 ? Math.round((b.volume / maxBucketVolume) * 1000) / 10 : 0,
  }));
}
