import { ForecastData } from '../types/energy';

export function generateForecast(
  currentYear: number,
  currentRenewablePercentage: number,
  targetCO2Reduction: number,
  scenario: 'conservative' | 'moderate' | 'aggressive' = 'moderate'
): ForecastData[] {
  const forecastYears = Array.from({ length: 11 }, (_, i) => currentYear + 1 + i);
  const growthRates = {
    conservative: 0.8,
    moderate: 1.2,
    aggressive: 1.8
  };
  
  const baseGrowthRate = growthRates[scenario];
  const targetMultiplier = Math.max(0.5, Math.min(2, targetCO2Reduction / 50));
  
  return forecastYears.map((year, index) => {
    const yearsFromNow = index + 1;
    const growthFactor = Math.pow(1 + (baseGrowthRate * targetMultiplier) / 100, yearsFromNow);
    
    // Add some realistic constraints and curve smoothing
    const maxGrowth = scenario === 'aggressive' ? 0.95 : scenario === 'moderate' ? 0.85 : 0.75;
    const renewablePercentage = Math.min(
      currentRenewablePercentage * growthFactor,
      maxGrowth * 100
    );
    
    const co2Reduction = Math.min(
      (renewablePercentage / 100) * targetCO2Reduction * (1 + yearsFromNow * 0.1),
      targetCO2Reduction
    );
    
    return {
      year,
      scenario,
      renewablePercentage: Math.round(renewablePercentage * 10) / 10,
      co2Reduction: Math.round(co2Reduction * 10) / 10
    };
  });
}