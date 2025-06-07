import React from 'react';
import { Play, Pause } from 'lucide-react';

interface TimeSliderProps {
  currentYear: number;
  minYear: number;
  maxYear: number;
  isPlaying: boolean;
  onYearChange: (year: number) => void;
  onPlayToggle: () => void;
}

const TimeSlider: React.FC<TimeSliderProps> = ({
  currentYear,
  minYear,
  maxYear,
  isPlaying,
  onYearChange,
  onPlayToggle
}) => {
  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayToggle}
          className="flex items-center justify-center w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-sm font-medium">Timeline</span>
            <span className="text-emerald-400 text-lg font-bold">{currentYear}</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{minYear}</span>
              <span>{maxYear}</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transition: transform 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
};

export default TimeSlider;