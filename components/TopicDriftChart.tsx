import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/analytics/topics';
const DRIFT_DATA = [
  { topic: 'GESELLSCHAFT', score: 2.75, color: '#f87171' }, // Rot (Stärkster Drift)
  { topic: 'TECHNOLOGIE', score: 4.13, color: '#fbbf24' },   // Orange
  { topic: 'HARMLOS', score: 5.27, color: '#60a5fa' },       // Blau
];
const MAX_SCORE_VISUAL = 10; // Skalierung für die niedrigen Werte

export const TopicDriftChart: React.FC = () => {
  // ... data fetching

  return (
    <div className="p-4 bg-gray-900 border-2 border-cyan-700">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">FELD-VERLUST ANALYSE (TOP 3 RISIKEN)</h3>
      
      <div className="space-y-4">
        {DRIFT_DATA.map((item) => (
          <div key={item.topic}>
            <div className="flex justify-between items-center text-sm font-mono text-gray-300">
              <span className="text-red-400">{item.topic}</span>
              <span className="text-lg font-bold" style={{ color: item.color }}>{item.score}%</span>
            </div>
            {/* Visueller Balken, skaliert für niedrige Scores */}
            <div className="w-full bg-gray-800 h-3">
              <div 
                className="h-full transition-all duration-500" 
                style={{ 
                  width: `${(item.score / MAX_SCORE_VISUAL) * 100}%`, 
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
