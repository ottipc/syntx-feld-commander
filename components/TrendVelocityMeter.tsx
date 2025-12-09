import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/analytics/trends';
const CURRENT_AVG = 11.9; // Aktueller Durchschnitts-Score
const PREDICTED_NEXT = 6.33; // Vorhersage des nächsten Scores (negativ)
const TREND_STATUS = 'ABWÄRTS-DRIFT'; 

export const TrendVelocityMeter: React.FC = () => {
  // ... data fetching

  const predictionColor = PREDICTED_NEXT < CURRENT_AVG ? 'text-red-500' : 'text-green-500';
  const arrow = PREDICTED_NEXT < CURRENT_AVG ? '↓' : '→';

  return (
    <div className="p-4 bg-gray-900 border-2 border-cyan-700">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">SCORE TREND ANALYSE</h3>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-mono text-gray-400">AKTUELL (Avg. Score)</p>
          <p className="text-4xl font-black text-cyan-400">{CURRENT_AVG.toFixed(1)}%</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono text-gray-400">PREDICTED NEXT SCORE</p>
          <p className={`text-4xl font-black ${predictionColor}`}>
            {arrow} {PREDICTED_NEXT.toFixed(2)}%
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs font-mono text-red-500">TREND-STATUS: {TREND_STATUS}</p>
      <p className="mt-1 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
