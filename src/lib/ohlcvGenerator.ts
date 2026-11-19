// src/lib/ohlcvGenerator.ts
import { OHLCV } from '@/types/stock';
import { normalRandom } from './mockDataGenerator';

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function generateOHLCV(
  startPrice: number,
  days: number = 252, // 1 trading year
  volatility: number = 0.02,
  avgVolume: number = 1000000
): OHLCV[] {
  const candles: OHLCV[] = [];
  let currentPrice = startPrice;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Math.round(days * 1.45)); // adjust for weekends

  let calendarDay = 0;
  while (candles.length < days) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + calendarDay);
    calendarDay++;

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const dailyReturn = normalRandom() * volatility;
    const open = round2(currentPrice);
    const intraday1 = open * (1 + normalRandom() * volatility * 0.5);
    const intraday2 = open * (1 + normalRandom() * volatility * 0.5);
    const close = round2(Math.max(1, open * (1 + dailyReturn)));
    const high = round2(Math.max(open, close, intraday1, intraday2) * (1 + Math.abs(normalRandom()) * 0.005));
    const low = round2(Math.min(open, close, intraday1, intraday2) * (1 - Math.abs(normalRandom()) * 0.005));

    // Volume is correlated with price movement magnitude
    const volumeMultiplier = 1 + Math.abs(dailyReturn) * 10;
    const volume = Math.round(avgVolume * volumeMultiplier * (0.5 + Math.random()));

    candles.push({
      time: Math.floor(date.getTime() / 1000),
      open,
      high: Math.max(high, open, close),
      low: Math.min(low, open, close),
      close,
      volume,
    });

    currentPrice = close;
  }

  return candles;
}
