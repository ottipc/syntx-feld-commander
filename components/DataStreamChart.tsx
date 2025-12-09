import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/prompts/score-distribution';
// Score-Verteilung aus
const SCORE_DISTRIBUTION = [
  { range: '0-20', count: 308 },
  { range: '20-40', count: 18 },
  { range: '40-60', count: 9 },
  { range: '60-80', count: 0 },
  { range: '80-90', count: 0 },
  { range: '90-95', count: 0 },
  { range: '95-98', count: 0 },
  { range: '98-100', count: 0 },
];

export const DataStreamChart: React.FC = () => {
  // Die Gesamtzahl der Prompts (335)
  const totalCount = SCORE_DISTRIBUTION.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...SCORE_DISTRIBUTION.map(item => item.count));
  const heightScale = 150; // Skalierung für die Visualisierung

  return (
    <div className="p-4 bg-gray-900 border-2 border-cyan-700">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">SCORE-VERTEILUNG (PROMPTS)</h3>
      <p className="text-xs text-gray-500 mb-4">Anzahl der Prompts pro erreichter Score-Bandbreite (0-100).</p>
      
      <div className="flex items-end h-48 border-l border-b border-gray-700">
        {SCORE_DISTRIBUTION.map((item) => (
          <div key={item.range} className="flex flex-col items-center mx-1 h-full justify-end">
            <div 
              className="bg-cyan-500 w-6 transition-all duration-500"
              style={{ 
                height: `${(item.count / maxCount) * heightScale}px`,
                backgroundColor: item.count > 0 ? (item.range === '0-20' ? '#f87171' : '#06b6d4') : '#1f2937' // Rot für 0-20
              }}
              title={`${item.range}: ${item.count} Prompts`}
            />
            <span className="text-xs text-gray-400 mt-1">{item.range}</span>
            <span className="text-xs text-gray-500">{item.count}</span>
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-xs text-gray-600">Gesamt-Prompts: {totalCount} | Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
