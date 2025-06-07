export interface EnergyData {
  country: string;
  year: number;
  solar: number;
  wind: number;
  hydro: number;
  total: number;
  renewablePercentage: number;
  co2Reduction: number;
}

export interface CountryData {
  name: string;
  code: string;
  data: EnergyData[];
}

export interface ForecastData {
  year: number;
  scenario: 'conservative' | 'moderate' | 'aggressive';
  renewablePercentage: number;
  co2Reduction: number;
}