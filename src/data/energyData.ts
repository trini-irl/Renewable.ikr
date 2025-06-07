import { CountryData } from '../types/energy';

export const energyData: CountryData[] = [
  {
    name: 'United States',
    code: 'US',
    data: Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const growth = i / 24;
      return {
        country: 'United States',
        year,
        solar: Math.round(5 + growth * 120 + Math.sin(i * 0.3) * 10),
        wind: Math.round(10 + growth * 150 + Math.cos(i * 0.2) * 15),
        hydro: Math.round(80 + growth * 20 + Math.sin(i * 0.1) * 5),
        total: 0,
        renewablePercentage: Math.min(15 + growth * 35, 45),
        co2Reduction: Math.round(growth * 25 + Math.sin(i * 0.2) * 3)
      };
    })
  },
  {
    name: 'China',
    code: 'CN',
    data: Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const growth = i / 24;
      return {
        country: 'China',
        year,
        solar: Math.round(2 + growth * 200 + Math.sin(i * 0.4) * 20),
        wind: Math.round(5 + growth * 180 + Math.cos(i * 0.3) * 25),
        hydro: Math.round(120 + growth * 80 + Math.sin(i * 0.15) * 10),
        total: 0,
        renewablePercentage: Math.min(12 + growth * 38, 48),
        co2Reduction: Math.round(growth * 30 + Math.cos(i * 0.2) * 4)
      };
    })
  },
  {
    name: 'Germany',
    code: 'DE',
    data: Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const growth = i / 24;
      return {
        country: 'Germany',
        year,
        solar: Math.round(1 + growth * 80 + Math.sin(i * 0.5) * 8),
        wind: Math.round(8 + growth * 90 + Math.cos(i * 0.25) * 12),
        hydro: Math.round(25 + growth * 5 + Math.sin(i * 0.1) * 2),
        total: 0,
        renewablePercentage: Math.min(20 + growth * 35, 52),
        co2Reduction: Math.round(growth * 28 + Math.sin(i * 0.3) * 3)
      };
    })
  },
  {
    name: 'India',
    code: 'IN',
    data: Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const growth = i / 24;
      return {
        country: 'India',
        year,
        solar: Math.round(1 + growth * 90 + Math.sin(i * 0.6) * 12),
        wind: Math.round(3 + growth * 70 + Math.cos(i * 0.35) * 10),
        hydro: Math.round(40 + growth * 25 + Math.sin(i * 0.12) * 5),
        total: 0,
        renewablePercentage: Math.min(8 + growth * 28, 35),
        co2Reduction: Math.round(growth * 22 + Math.cos(i * 0.25) * 3)
      };
    })
  },
  {
    name: 'Brazil',
    code: 'BR',
    data: Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const growth = i / 24;
      return {
        country: 'Brazil',
        year,
        solar: Math.round(0.5 + growth * 40 + Math.sin(i * 0.4) * 5),
        wind: Math.round(2 + growth * 60 + Math.cos(i * 0.3) * 8),
        hydro: Math.round(200 + growth * 50 + Math.sin(i * 0.08) * 15),
        total: 0,
        renewablePercentage: Math.min(75 + growth * 10, 83),
        co2Reduction: Math.round(growth * 18 + Math.sin(i * 0.2) * 2)
      };
    })
  },
  {
    name: 'Japan',
    code: 'JP',
    data: Array.from({ length: 25 }, (_, i) => {
      const year = 2000 + i;
      const growth = i / 24;
      return {
        country: 'Japan',
        year,
        solar: Math.round(3 + growth * 75 + Math.sin(i * 0.45) * 10),
        wind: Math.round(2 + growth * 35 + Math.cos(i * 0.3) * 5),
        hydro: Math.round(95 + growth * 10 + Math.sin(i * 0.1) * 3),
        total: 0,
        renewablePercentage: Math.min(18 + growth * 22, 38),
        co2Reduction: Math.round(growth * 20 + Math.cos(i * 0.2) * 2)
      };
    })
  }
];

// Calculate totals
energyData.forEach(country => {
  country.data.forEach(yearData => {
    yearData.total = yearData.solar + yearData.wind + yearData.hydro;
  });
});