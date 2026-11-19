// src/lib/mockDataGenerator.ts
import { Stock, Sector, MarketCapCategory } from '@/types/stock';

export function normalRandom(): number {
  // Box-Muller transform for standard normal distribution N(0, 1)
  let u1 = 0;
  let u2 = 0;
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();
  return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round2(val: number): number {
  return Math.round(val * 100) / 100;
}

export const SECTOR_METADATA: Record<
  Sector,
  {
    weight: number;
    avgPE: number;
    avgBeta: number;
    avgDivYield: number;
    avgDebtEquity: number;
    industries: string[];
    prefix: string;
    realCompanies: { symbol: string; name: string }[];
  }
> = {
  'Banking & Financial Services': {
    weight: 0.15,
    avgPE: 18.5,
    avgBeta: 1.1,
    avgDivYield: 1.2,
    avgDebtEquity: 8.5,
    industries: ['Private Banks', 'Public Sector Banks', 'NBFC', 'Housing Finance', 'Insurance', 'Brokerage'],
    prefix: 'FIN',
    realCompanies: [
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd' },
      { symbol: 'SBIN', name: 'State Bank of India' },
      { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd' },
      { symbol: 'AXISBANK', name: 'Axis Bank Ltd' },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd' },
      { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd' },
      { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd' },
    ],
  },
  'Information Technology': {
    weight: 0.12,
    avgPE: 25.0,
    avgBeta: 0.85,
    avgDivYield: 1.5,
    avgDebtEquity: 0.15,
    industries: ['IT Services', 'Cloud & SaaS', 'Consulting & BPO', 'Product Engineering', 'Fintech'],
    prefix: 'TECH',
    realCompanies: [
      { symbol: 'TCS', name: 'Tata Consultancy Services Ltd' },
      { symbol: 'INFY', name: 'Infosys Ltd' },
      { symbol: 'WIPRO', name: 'Wipro Ltd' },
      { symbol: 'HCLTECH', name: 'HCL Technologies Ltd' },
      { symbol: 'TECHM', name: 'Tech Mahindra Ltd' },
      { symbol: 'LTIM', name: 'LTIMindtree Ltd' },
      { symbol: 'PERSISTENT', name: 'Persistent Systems Ltd' },
      { symbol: 'COFORGE', name: 'Coforge Ltd' },
    ],
  },
  'Pharmaceuticals & Healthcare': {
    weight: 0.10,
    avgPE: 30.0,
    avgBeta: 0.70,
    avgDivYield: 0.8,
    avgDebtEquity: 0.35,
    industries: ['Formulations', 'APIs & Bulk Drugs', 'Biotech', 'Hospital Chains', 'Diagnostics'],
    prefix: 'PHARMA',
    realCompanies: [
      { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd' },
      { symbol: 'DRREDDY', name: "Dr. Reddy's Laboratories Ltd" },
      { symbol: 'CIPLA', name: 'Cipla Ltd' },
      { symbol: 'DIVISLAB', name: "Divi's Laboratories Ltd" },
      { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd' },
      { symbol: 'LUPIN', name: 'Lupin Ltd' },
      { symbol: 'ZYDUSLIFE', name: 'Zydus Lifesciences Ltd' },
    ],
  },
  'Consumer Goods (FMCG)': {
    weight: 0.08,
    avgPE: 35.0,
    avgBeta: 0.60,
    avgDivYield: 1.8,
    avgDebtEquity: 0.2,
    industries: ['Packaged Foods', 'Personal Care', 'Beverages', 'Home Care', 'Tobacco Products'],
    prefix: 'FMCG',
    realCompanies: [
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd' },
      { symbol: 'ITC', name: 'ITC Ltd' },
      { symbol: 'NESTLEIND', name: 'Nestle India Ltd' },
      { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd' },
      { symbol: 'TATACONSUM', name: 'Tata Consumer Products Ltd' },
      { symbol: 'DABUR', name: 'Dabur India Ltd' },
      { symbol: 'MARICO', name: 'Marico Ltd' },
    ],
  },
  'Automobile & Auto Components': {
    weight: 0.07,
    avgPE: 22.0,
    avgBeta: 1.05,
    avgDivYield: 1.0,
    avgDebtEquity: 0.65,
    industries: ['Passenger Vehicles', 'Commercial Vehicles', 'Two Wheelers', 'Auto Ancillaries', 'Tyres'],
    prefix: 'AUTO',
    realCompanies: [
      { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd' },
      { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd' },
      { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd' },
      { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd' },
      { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd' },
      { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd' },
      { symbol: 'ASHOKLEY', name: 'Ashok Leyland Ltd' },
    ],
  },
  'Metals & Mining': {
    weight: 0.06,
    avgPE: 12.0,
    avgBeta: 1.40,
    avgDivYield: 2.5,
    avgDebtEquity: 0.85,
    industries: ['Steel', 'Aluminium', 'Copper & Zinc', 'Mining & Minerals', 'Sponge Iron'],
    prefix: 'METAL',
    realCompanies: [
      { symbol: 'TATASTEEL', name: 'Tata Steel Ltd' },
      { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd' },
      { symbol: 'HINDALCO', name: 'Hindalco Industries Ltd' },
      { symbol: 'VEDL', name: 'Vedanta Ltd' },
      { symbol: 'COALINDIA', name: 'Coal India Ltd' },
      { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power Ltd' },
    ],
  },
  'Energy (Oil, Gas, Power)': {
    weight: 0.06,
    avgPE: 14.0,
    avgBeta: 0.95,
    avgDivYield: 3.0,
    avgDebtEquity: 1.1,
    industries: ['Oil Exploration', 'Refineries', 'City Gas Distribution', 'Thermal Power', 'Renewable Power'],
    prefix: 'ENERGY',
    realCompanies: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
      { symbol: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd' },
      { symbol: 'NTPC', name: 'NTPC Ltd' },
      { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd' },
      { symbol: 'IOC', name: 'Indian Oil Corporation Ltd' },
      { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd' },
      { symbol: 'ADANIGREEN', name: 'Adani Green Energy Ltd' },
    ],
  },
  'Real Estate & Construction': {
    weight: 0.07,
    avgPE: 20.0,
    avgBeta: 1.30,
    avgDivYield: 0.5,
    avgDebtEquity: 1.25,
    industries: ['Residential Developers', 'Commercial Properties', 'REITs', 'Construction Infra', 'Civil Contracting'],
    prefix: 'REAL',
    realCompanies: [
      { symbol: 'DLF', name: 'DLF Ltd' },
      { symbol: 'GODREJPROP', name: 'Godrej Properties Ltd' },
      { symbol: 'OBEROIRLTY', name: 'Oberoi Realty Ltd' },
      { symbol: 'PHOENIXLTD', name: 'The Phoenix Mills Ltd' },
      { symbol: 'PRESTIGE', name: 'Prestige Estates Projects Ltd' },
    ],
  },
  'Telecom & Media': {
    weight: 0.04,
    avgPE: 28.0,
    avgBeta: 0.90,
    avgDivYield: 0.3,
    avgDebtEquity: 1.6,
    industries: ['Telecom Services', 'Broadcasting', 'Digital Content', 'Cable & Satellite', 'Advertising'],
    prefix: 'MEDIA',
    realCompanies: [
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd' },
      { symbol: 'INDUSINFR', name: 'Indus Towers Ltd' },
      { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Ltd' },
      { symbol: 'SUNTV', name: 'Sun TV Network Ltd' },
      { symbol: 'PVRINOX', name: 'PVR INOX Ltd' },
    ],
  },
  'Infrastructure & Capital Goods': {
    weight: 0.08,
    avgPE: 18.0,
    avgBeta: 1.15,
    avgDivYield: 1.0,
    avgDebtEquity: 0.95,
    industries: ['Heavy Engineering', 'Power Equipment', 'Pipes & Fittings', 'Port Operations', 'Road Infrastructure'],
    prefix: 'INFRA',
    realCompanies: [
      { symbol: 'LT', name: 'Larsen & Toubro Ltd' },
      { symbol: 'SIEMENS', name: 'Siemens Ltd' },
      { symbol: 'ABB', name: 'ABB India Ltd' },
      { symbol: 'BHEL', name: 'Bharat Heavy Electricals Ltd' },
      { symbol: 'ADANIPORTS', name: 'Adani Ports & Special Economic Zone Ltd' },
    ],
  },
  'Chemicals & Fertilisers': {
    weight: 0.07,
    avgPE: 22.0,
    avgBeta: 0.80,
    avgDivYield: 1.2,
    avgDebtEquity: 0.45,
    industries: ['Speciality Chemicals', 'Agrochemicals', 'Fertilisers', 'Industrial Chemicals', 'Polymers'],
    prefix: 'CHEM',
    realCompanies: [
      { symbol: 'PIDILITIND', name: 'Pidilite Industries Ltd' },
      { symbol: 'SRF', name: 'SRF Ltd' },
      { symbol: 'DEEPAKNTR', name: 'Deepak Nitrite Ltd' },
      { symbol: 'TATACHEM', name: 'Tata Chemicals Ltd' },
      { symbol: 'UPL', name: 'UPL Ltd' },
      { symbol: 'AARTIIND', name: 'Aarti Industries Ltd' },
    ],
  },
  'Others': {
    weight: 0.10,
    avgPE: 16.0,
    avgBeta: 1.00,
    avgDivYield: 1.5,
    avgDebtEquity: 0.6,
    industries: ['Textiles', 'Paper & Packaging', 'Logistics', 'Retail & Consumer Services', 'Diversified Conglomerates'],
    prefix: 'CORP',
    realCompanies: [
      { symbol: 'TITAN', name: 'Titan Company Ltd' },
      { symbol: 'TRENT', name: 'Trent Ltd' },
      { symbol: 'DMART', name: 'Avenue Supermarts Ltd' },
      { symbol: 'PAGEIND', name: 'Page Industries Ltd' },
      { symbol: 'DELHIVERY', name: 'Delhivery Ltd' },
      { symbol: 'CENTURYTEX', name: 'Century Textiles & Industries Ltd' },
    ],
  },
};

const SECTORS = Object.keys(SECTOR_METADATA) as Sector[];

const INDEX_WEIGHTS = [
  { name: 'NIFTY 50', minCap: 60000, maxStocks: 50 },
  { name: 'BSE Sensex', minCap: 80000, maxStocks: 30 },
  { name: 'NIFTY Next 50', minCap: 35000, maxStocks: 50 },
  { name: 'NIFTY Midcap 100', minCap: 10000, maxStocks: 100 },
  { name: 'NIFTY Smallcap 250', minCap: 1000, maxStocks: 250 },
];

export function generateMockStocks(count: number = 5000): Stock[] {
  const stocks: Stock[] = [];
  const largeCapTarget = Math.round(count * 0.02); // ~100
  const midCapTarget = Math.round(count * 0.08);   // ~400
  const smallCapTarget = Math.round(count * 0.30); // ~1500
  const microCapTarget = count - (largeCapTarget + midCapTarget + smallCapTarget); // ~3000

  let index = 0;
  let realCompanyIdx = 0;

  // Flatten all real companies
  const allRealCompanies: { symbol: string; name: string; sector: Sector }[] = [];
  for (const s of SECTORS) {
    for (const c of SECTOR_METADATA[s].realCompanies) {
      allRealCompanies.push({ ...c, sector: s });
    }
  }

  // Helper to generate a single stock
  const createStock = (
    targetCategory: MarketCapCategory,
    sectorOverride?: Sector,
    realCompany?: { symbol: string; name: string; sector: Sector }
  ): Stock => {
    const sector = realCompany ? realCompany.sector : sectorOverride || SECTORS[Math.floor(Math.random() * SECTORS.length)];
    const meta = SECTOR_METADATA[sector];
    const industry = meta.industries[Math.floor(Math.random() * meta.industries.length)];

    let marketCap = 0;
    if (targetCategory === 'Large Cap') {
      // 50,000 to 20,00,000 Cr
      marketCap = Math.round(50000 + Math.pow(Math.random(), 2.5) * 1950000);
    } else if (targetCategory === 'Mid Cap') {
      // 10,000 to 49,999 Cr
      marketCap = Math.round(10000 + Math.random() * 39999);
    } else if (targetCategory === 'Small Cap') {
      // 1,000 to 9,999 Cr
      marketCap = Math.round(1000 + Math.random() * 8999);
    } else {
      // Micro Cap: 50 to 999 Cr
      marketCap = Math.round(50 + Math.random() * 949);
    }

    // Symbol & Name
    let symbol = '';
    let companyName = '';
    if (realCompany) {
      symbol = realCompany.symbol;
      companyName = realCompany.name;
    } else {
      symbol = `${meta.prefix}${String(index + 1).padStart(4, '0')}`;
      companyName = `${meta.prefix} ${industry} Enterprise ${index + 1} Ltd`;
    }

    // Correlation 1: Market Cap vs Beta (Large Cap 0.5 - 1.2, Micro Cap 0.3 - 2.5, approx -0.3 correlation)
    let beta = 1.0;
    if (targetCategory === 'Large Cap') {
      beta = round2(clamp(meta.avgBeta * (0.8 + Math.random() * 0.4) - 0.1, 0.5, 1.2));
    } else if (targetCategory === 'Micro Cap') {
      beta = round2(clamp(meta.avgBeta * (0.5 + Math.random() * 1.8) + 0.3, 0.3, 2.5));
    } else {
      beta = round2(clamp(meta.avgBeta * (0.7 + Math.random() * 0.6), 0.4, 1.8));
    }

    // Correlation 2: Market Cap vs Promoter Holding (Large Cap 40-75%, Micro Cap 20-90% with higher variance)
    let promoterHolding = 50;
    if (targetCategory === 'Large Cap') {
      promoterHolding = round2(clamp(55 + normalRandom() * 9, 40, 75));
    } else {
      promoterHolding = round2(clamp(50 + normalRandom() * 18, 20, 90));
    }

    // Revenue and Profit Growth
    const isHighGrowth = Math.random() > 0.65;
    const revenueGrowthYoY = round2(
      isHighGrowth ? 25 + Math.random() * 45 : clamp(-15 + normalRandom() * 15, -60, 24.9)
    );
    const profitGrowthYoY = round2(revenueGrowthYoY * (0.8 + Math.random() * 0.6) + normalRandom() * 8);

    // Correlation 3: P/E vs Growth (High-growth >25% has higher P/E 20-80, slow-growth 5-15 or negative)
    let pe: number | null = null;
    if (profitGrowthYoY < -15 && Math.random() > 0.4) {
      pe = round2(-5 - Math.random() * 45); // negative PE for loss-making
    } else if (revenueGrowthYoY > 25) {
      pe = round2(clamp(meta.avgPE * 1.4 + (revenueGrowthYoY - 25) * 0.9 + normalRandom() * 8, 20, 95));
    } else {
      pe = round2(clamp(meta.avgPE * 0.75 + normalRandom() * 4, 5, 25));
    }

    // Correlation 4: Debt/Equity vs Sector (Banking 5-15x, IT/FMCG 0-0.5, Infra 0.5-2.0)
    let debtToEquity = 0.5;
    if (sector === 'Banking & Financial Services') {
      debtToEquity = round2(clamp(6.0 + Math.random() * 8.5, 5.0, 15.0));
    } else if (sector === 'Information Technology' || sector === 'Consumer Goods (FMCG)') {
      debtToEquity = round2(clamp(Math.random() * 0.45, 0.0, 0.5));
    } else if (sector === 'Infrastructure & Capital Goods' || sector === 'Real Estate & Construction') {
      debtToEquity = round2(clamp(0.6 + Math.random() * 1.3, 0.5, 2.0));
    } else {
      debtToEquity = round2(clamp(meta.avgDebtEquity * (0.6 + Math.random() * 0.8), 0.1, 3.0));
    }

    // Price & Daily Movements
    const baseShareCount = (marketCap * 10000000) / (targetCategory === 'Large Cap' ? 1200 : 250);
    let lastPrice = round2(clamp((marketCap * 10000000) / baseShareCount, 5, 85000));
    const volatility = clamp(0.012 + (beta * 0.015) + (targetCategory === 'Micro Cap' ? 0.01 : 0), 0.01, 0.06);

    // 5-day return simulation for RSI correlation
    const fiveDayReturn = normalRandom() * volatility * 2.2;
    const dayChangePercent = round2(normalRandom() * (volatility * 100) * 1.2);
    const dayChangeAbs = round2((lastPrice * dayChangePercent) / 100);
    const previousClose = round2(lastPrice - dayChangeAbs);
    const dayOpen = round2(previousClose * (1 + (normalRandom() * 0.005)));
    const dayHigh = round2(Math.max(lastPrice, dayOpen) * (1 + Math.abs(normalRandom()) * 0.008));
    const dayLow = round2(Math.min(lastPrice, dayOpen) * (1 - Math.abs(normalRandom()) * 0.008));

    // Correlation 5: RSI vs 5-day return (positive > 50, negative < 50, never exactly 50)
    let rsi14 = round2(clamp(50 + fiveDayReturn * 450 + normalRandom() * 8, 14, 88));
    if (rsi14 === 50) rsi14 = 50.5;

    // Correlation 6: Volume vs Price Movement (large absolute change has above-average volume)
    const baseAvgVolume = targetCategory === 'Large Cap' ? 2500000 : targetCategory === 'Mid Cap' ? 800000 : 200000;
    const avgVolume20D = Math.round(baseAvgVolume * (0.6 + Math.random() * 0.8));
    const volumeMultiplier = 1 + (Math.abs(dayChangePercent) / 4) + (Math.random() * 0.5);
    const volume = Math.round(avgVolume20D * volumeMultiplier);

    // 52 Week High / Low
    const week52High = round2(Math.max(dayHigh * (1 + Math.random() * 0.45), lastPrice * 1.05));
    const week52Low = round2(Math.min(dayLow * (1 - Math.random() * 0.35), lastPrice * 0.95));
    const week52HighProximity = round2(((lastPrice - week52Low) / (week52High - week52Low)) * 100);
    const week52LowProximity = round2(100 - week52HighProximity);

    // Other fundamentals
    const pb = round2(clamp(meta.avgPE * 0.15 + (roeHelper(sector) / 10) + normalRandom() * 0.8, 0.4, 28));
    const dividendYield = round2(clamp(meta.avgDivYield * (0.5 + Math.random()), 0.0, 9.5));
    const eps = pe && pe > 0 ? round2(lastPrice / pe) : round2(-lastPrice * 0.05);
    const roe = round2(clamp(roeHelper(sector) + normalRandom() * 6, -20, 65));
    const roce = round2(clamp(roe * 1.1 + normalRandom() * 4, -15, 75));
    const currentRatio = round2(clamp(1.2 + normalRandom() * 0.7, 0.4, 8.5));

    // Technical fields
    const sma50 = round2(lastPrice * (1 + normalRandom() * 0.04));
    const sma200 = round2(lastPrice * (1 + normalRandom() * 0.09));
    const atr = round2(lastPrice * volatility * 1.5);
    const macdSignal: 'Bullish' | 'Bearish' | 'Neutral' =
      dayChangePercent > 1.5 ? 'Bullish' : dayChangePercent < -1.5 ? 'Bearish' : 'Neutral';
    const bollingerPosition: 'Above' | 'Within' | 'Below' =
      lastPrice > sma50 * 1.04 ? 'Above' : lastPrice < sma50 * 0.96 ? 'Below' : 'Within';
    const volRatio = volume / avgVolume20D;
    const volumeVsAvg: 'Below' | 'Above' | '2x' | '3x' =
      volRatio >= 3.0 ? '3x' : volRatio >= 2.0 ? '2x' : volRatio >= 1.0 ? 'Above' : 'Below';

    // Index memberships
    const indexMembership: string[] = [];
    for (const idx of INDEX_WEIGHTS) {
      if (marketCap >= idx.minCap && Math.random() > 0.4) {
        indexMembership.push(idx.name);
      }
    }

    index++;

    return {
      symbol,
      companyName,
      sector,
      industry,
      marketCapCategory: targetCategory,
      indexMembership,
      lastPrice,
      previousClose,
      dayOpen,
      dayHigh,
      dayLow,
      changePercent: dayChangePercent,
      changeAbsolute: dayChangeAbs,
      volume,
      avgVolume20D,
      week52High,
      week52Low,
      week52HighProximity,
      week52LowProximity,
      marketCap,
      pe,
      pb,
      dividendYield,
      eps,
      roe,
      roce,
      debtToEquity,
      currentRatio,
      promoterHolding,
      revenueGrowthYoY,
      profitGrowthYoY,
      rsi14,
      sma50,
      sma200,
      beta,
      atr,
      macdSignal,
      bollingerPosition,
      volumeVsAvg,
      volatility,
      lastUpdated: Date.now(),
    };
  };

  function roeHelper(sec: Sector): number {
    if (sec === 'Information Technology' || sec === 'Consumer Goods (FMCG)') return 24;
    if (sec === 'Banking & Financial Services') return 16;
    if (sec === 'Pharmaceuticals & Healthcare') return 18;
    return 13;
  }

  // 1. Generate Large Caps
  for (let i = 0; i < largeCapTarget; i++) {
    const real = realCompanyIdx < allRealCompanies.length ? allRealCompanies[realCompanyIdx++] : undefined;
    stocks.push(createStock('Large Cap', undefined, real));
  }

  // 2. Generate Mid Caps
  for (let i = 0; i < midCapTarget; i++) {
    const real = realCompanyIdx < allRealCompanies.length ? allRealCompanies[realCompanyIdx++] : undefined;
    stocks.push(createStock('Mid Cap', undefined, real));
  }

  // 3. Generate Small Caps
  for (let i = 0; i < smallCapTarget; i++) {
    stocks.push(createStock('Small Cap'));
  }

  // 4. Generate Micro Caps
  for (let i = 0; i < microCapTarget; i++) {
    stocks.push(createStock('Micro Cap'));
  }

  return stocks;
}
