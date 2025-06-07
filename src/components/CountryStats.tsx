import React from 'react';
import { EnergyData } from '../types/energy';
import { Zap, Wind, Droplet } from 'lucide-react';

interface CountryStatsProps {
  data: EnergyData[];
}

const CountryStats: React.FC<CountryStatsProps> = ({ data }) => {
  const totalRenewable = data.reduce((sum, country) => sum + country.total, 0);
  const totalSolar = data.reduce((sum, country) => sum + country.solar, 0);
  const totalWind = data.reduce((sum, country) => sum + country.wind, 0);
  const totalHydro = data.reduce((sum, country) => sum + country.hydro, 0);
  
  const avgRenewablePercentage = data.reduce((sum, country) => sum + country.renewablePercentage, 0) / data.length;
  const totalCO2Reduction = data.reduce((sum, country) => sum + country.co2Reduction, 0);

  const statCards = [
    {
      title: 'Total Renewable Capacity',
      value: `${totalRenewable.toFixed(0)} GW`,
      icon: Zap,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Solar Capacity',
      value: `${totalSolar.toFixed(0)} GW`,
      icon: Zap,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      title: 'Wind Capacity',
      value: `${totalWind.toFixed(0)} GW`,
      icon: Wind,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      title: 'Hydro Capacity',
      value: `${totalHydro.toFixed(0)} GW`,
      icon: Droplet,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20'
    },
    {
      title: 'Avg. Renewable %',
      value: `${avgRenewablePercentage.toFixed(1)}%`,
      icon: Zap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'CO₂ Reduction',
      value: `${totalCO2Reduction.toFixed(0)}%`,
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                <p className={`${stat.color} text-2xl font-bold mt-1`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} ${stat.bgColor} p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryStats;