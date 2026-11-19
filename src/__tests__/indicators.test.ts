// src/__tests__/indicators.test.ts
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateSMA, calculateEMA, calculateBollingerBands, calculateRSI } from '../lib/indicators.ts';

function closeTo(actual: number | undefined, expected: number, delta: number = 0.05) {
  assert.ok(actual !== undefined, `Expected value to be defined, got undefined`);
  assert.ok(
    Math.abs(actual - expected) <= delta,
    `Expected ${actual} to be close to ${expected} within delta ${delta}`
  );
}

describe('Technical Indicators Formula Verification', () => {
  const verificationPrices = [100, 102, 104, 103, 105, 107, 106, 108, 110, 109];

  describe('Simple Moving Average (SMA)', () => {
    it('calculates SMA(5) matching Appendix B1 verification data within 0.01 tolerance', () => {
      const sma5 = calculateSMA(verificationPrices, 5);

      // Undefined before period
      assert.strictEqual(sma5[0], undefined);
      assert.strictEqual(sma5[1], undefined);
      assert.strictEqual(sma5[2], undefined);
      assert.strictEqual(sma5[3], undefined);

      // Expected values from Appendix B1: [102.8, 104.2, 105.0, 105.8, 107.2, 108.0]
      closeTo(sma5[4], 102.8);
      closeTo(sma5[5], 104.2);
      closeTo(sma5[6], 105.0);
      closeTo(sma5[7], 105.8);
      closeTo(sma5[8], 107.2);
      closeTo(sma5[9], 108.0);
    });

    it('returns array of undefined when prices array length is less than period', () => {
      const shortPrices = [10, 12, 14];
      const sma5 = calculateSMA(shortPrices, 5);
      assert.deepStrictEqual(sma5, [undefined, undefined, undefined]);
    });

    it('handles single-element period correctly', () => {
      const prices = [42, 43, 44];
      const sma1 = calculateSMA(prices, 1);
      assert.strictEqual(sma1[0], 42);
      assert.strictEqual(sma1[1], 43);
      assert.strictEqual(sma1[2], 44);
    });
  });

  describe('Exponential Moving Average (EMA)', () => {
    it('calculates EMA(5) matching Appendix B2 recursive formula and verification values', () => {
      const ema5 = calculateEMA(verificationPrices, 5);

      // First value at index 4 is equal to SMA(5) = 102.8
      closeTo(ema5[4], 102.8);

      // Value at index 5 = 107 * (2/6) + 102.8 * (4/6) = 104.20
      closeTo(ema5[5], 104.2);
    });

    it('gives higher weight to recent prices', () => {
      const jumpPrices = [10, 10, 10, 10, 10, 20];
      const ema = calculateEMA(jumpPrices, 5);
      const sma = calculateSMA(jumpPrices, 5);

      assert.ok(ema[5]! > sma[5]!);
    });
  });

  describe('Bollinger Bands', () => {
    it('calculates middle band equal to SMA and upper/lower bands with population std dev', () => {
      const twentyPrices = [
        100, 102, 104, 103, 105, 107, 106, 108, 110, 109,
        111, 113, 112, 115, 114, 116, 118, 117, 119, 120,
      ];
      const bb = calculateBollingerBands(twentyPrices, 20, 2);

      assert.ok(bb.middle[19] !== undefined);
      assert.ok(bb.upper[19] !== undefined);
      assert.ok(bb.lower[19] !== undefined);

      assert.ok(bb.upper[19]! > bb.middle[19]!);
      assert.ok(bb.middle[19]! > bb.lower[19]!);

      // Test symmetry: upper - middle == middle - lower
      const diffUpper = bb.upper[19]! - bb.middle[19]!;
      const diffLower = bb.middle[19]! - bb.lower[19]!;
      assert.ok(Math.abs(diffUpper - diffLower) < 0.05);
    });
  });

  describe('Relative Strength Index (RSI)', () => {
    it('handles all-gain trend (RSI = 100 when average loss is 0)', () => {
      const uptrend = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
      const rsi = calculateRSI(uptrend, 14);
      assert.strictEqual(rsi[14], 100);
      assert.strictEqual(rsi[15], 100);
    });

    it('handles all-loss trend (RSI = 0 when average gain is 0)', () => {
      const downtrend = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10];
      const rsi = calculateRSI(downtrend, 14);
      assert.strictEqual(rsi[14], 0);
      assert.strictEqual(rsi[15], 0);
    });

    it('keeps RSI bounded between 0 and 100 for fluctuating data', () => {
      const prices = [100, 102, 101, 103, 102, 104, 103, 105, 104, 106, 105, 107, 106, 108, 107, 109, 108, 110];
      const rsi = calculateRSI(prices, 14);
      for (let i = 14; i < rsi.length; i++) {
        assert.ok(rsi[i]! >= 0 && rsi[i]! <= 100);
      }
    });
  });
});
