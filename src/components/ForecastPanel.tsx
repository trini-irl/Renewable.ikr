import React, { useState, useEffect } from 'react';
import { generateForecast } from '../utils/forecast';
import { ForecastData } from '../types/energy';
import { TrendingUp, Target, Sparkles } from 'lucide-react';

interface ForecastPanelProps {
  currentYear: number;
  currentRenewablePercentage: number;
}

const ForecastPanel: React.FC<ForecastPanelProps> = ({ 
  currentYear, 
  currentRenewablePercentage 
}) => {
  const [targetCO2Reduction, setTargetCO2Reduction] = useState(50);
  const [selectedScenario, setSelectedScenario] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  useEffect(() => {
    const newForecast = generateForecast(
      currentYear,
      currentRenewablePercentage,
      targetCO2Reduction,
      selectedScenario
    );
    setForecast(newForecast);
  }, [currentYear, currentRenewablePercentage, targetCO2Reduction, selectedScenario]);

  const scenarios = [
    { 
      key: 'conservative' as const, 
      label: 'Conservative', 
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      description: 'Steady growth with current policies' 
    },
    { 
      key: 'moderate' as const, 
      label: 'Moderate', 
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      description: 'Enhanced policies and investments' 
    },
    { 
      key: 'aggressive' as const, 
      label: 'Aggressive', 
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      description: 'Rapid transition with strong incentives' 
    }
  ];

  const futureYears = [2030, 2035];
  const forecastResults = futureYears.map(year => {
    const yearData = forecast.find(f => f.year === year);
    return { year, data: yearData };
  });

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-purple-400" size={24} />
        <h3 className="text-xl font-bold text-white">ML Forecast Engine</h3>
      </div>

      {/* CO2 Target Input */}
      <div className="mb-6">
        <label className="block text-slate-300 text-sm font-medium mb-2">
          CO₂ Reduction Target (%)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="10"
            max="100"
            value={targetCO2Reduction}
            onChange={(e) => setTargetCO2Reduction(parseInt(e.target.value))}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1 rounded-lg">
            <Target className="text-emerald-400" size={16} />
            <span className="text-emerald-400 font-bold">{targetCO2Reduction}%</span>
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="mb-6">
        <label className="block text-slate-300 text-sm font-medium mb-3">
          Growth Scenario
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.key}
              onClick={() => setSelectedScenario(scenario.key)}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                selectedScenario === scenario.key
                  ? scenario.color
                  : 'bg-slate-700/30 text-slate-400 border-slate-600/50 hover:bg-slate-700/50'
              }`}
            >
              <div className="font-medium">{scenario.label}</div>
              <div className="text-xs mt-1 opacity-80">{scenario.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Forecast Results */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="text-emerald-400" size={20} />
          Projected Outcomes
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forecastResults.map(({ year, data }) => (
            <div
              key={year}
              className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30"
            >
              <div className="text-slate-400 text-sm font-medium">{year}</div>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Renewable %</span>
                  <span className="text-emerald-400 font-bold">
                    {data?.renewablePercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">CO₂ Reduction</span>
                  <span className="text-blue-400 font-bold">
                    {data?.co2Reduction.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(16, 185, 129, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 3px 8px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ForecastPanel;