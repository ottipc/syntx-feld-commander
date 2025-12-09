import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/analytics/scores/distribution';
const ANOMALY_COUNT = 308; // 0-20% Prompts
const TOTAL_SCORES = 335; // Gesamt Prompts

export const CriticalAnomalyTile: React.FC = () => {
  // ... data fetching

  const anomalyCount = ANOMALY_COUNT;
  const anomalyPercent = ((anomalyCount / TOTAL_SCORES) * 100).toFixed(1); // 91.9%

  return (
    <div className="p-6 bg-gray-900 border-4 border-red-800 shadow-2xl">
      <h3 className="text-md font-mono text-red-400">FELD-ANOMALIE (SCORE 0-20%)</h3>
      
      <div className="mt-2 flex items-baseline">
        <div className="text-8xl font-black text-red-500 animate-ping-slow">
          {anomalyCount}
        </div>
        <span className="ml-3 text-2xl text-red-300">PROMPTS</span>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {anomalyCount} von {TOTAL_SCORES} Gesamt-Scores ({anomalyPercent}%) sind kritisch.
      </p>
      <p className="mt-2 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
