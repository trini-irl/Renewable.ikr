import React, { useState, useEffect } from 'react';
import { energyData } from './data/energyData';
import TimeSlider from './components/TimeSlider';
import EnergyChart from './components/EnergyChart';
import CountryStats from './components/CountryStats';
import ForecastPanel from './components/ForecastPanel';
import { EnergyData } from './types/energy';
import { Leaf, Globe } from 'lucide-react';

function App() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentData, setCurrentData] = useState<EnergyData[]>([]);

  const minYear = 2000;
  const maxYear = 2024;

  // Update data when year changes
  useEffect(() => {
    const yearData = energyData.map(country => {
      const yearEntry = country.data.find(d => d.year === currentYear);
      return yearEntry || country.data[country.data.length - 1];
    });
    setCurrentData(yearData);
  }, [currentYear]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentYear(prev => {
        if (prev >= maxYear) {
          setIsPlaying(false);
          return maxYear;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, maxYear]);

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (currentYear >= maxYear) {
      setCurrentYear(minYear);
    }
    setIsPlaying(!isPlaying);
  };

  const avgRenewablePercentage = currentData.reduce((sum, country) => 
    sum + country.renewablePercentage, 0) / currentData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                <Leaf className="text-emerald-400" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Renewable Energy Progress Tracker
                </h1>
                <p className="text-slate-300 text-lg">
                  Interactive data story of global renewable energy adoption
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
              <Globe className="text-blue-400" size={20} />
              <span className="text-slate-300 text-sm">Global View</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Time Controls */}
        <TimeSlider
          currentYear={currentYear}
          minYear={minYear}
          maxYear={maxYear}
          isPlaying={isPlaying}
          onYearChange={handleYearChange}
          onPlayToggle={handlePlayToggle}
        />

        {/* Stats Overview */}
        <CountryStats data={currentData} />

        {/* Main Chart */}
        <EnergyChart data={currentData} />

        {/* Forecast Panel */}
        <ForecastPanel
          currentYear={currentYear}
          currentRenewablePercentage={avgRenewablePercentage}
        />

        {/* Country Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentData.map((country, index) => (
            <div
              key={country.country}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-white mb-4">{country.country}</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Solar</span>
                  <span className="text-orange-400 font-semibold">{country.solar} GW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Wind</span>
                  <span className="text-cyan-400 font-semibold">{country.wind} GW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Hydro</span>
                  <span className="text-teal-400 font-semibold">{country.hydro} GW</span>
                </div>
                <div className="border-t border-slate-700 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Renewable</span>
                    <span className="text-emerald-400 font-bold">{country.total} GW</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-300">Renewable %</span>
                    <span className="text-green-400 font-bold">{country.renewablePercentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(country.renewablePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-slate-400">
            <p className="mb-2">Data visualization showing renewable energy progress from {minYear} to {maxYear}</p>
            <p className="text-sm">Built with React, D3.js, and machine learning forecasting</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;