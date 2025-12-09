import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/analytics/performance';
const AVG_DURATION_MS = 53807; // Gesamtdurchschnitt
const MAX_DURATION_MS = 251807; // Maximalwert

const formatMs = (ms: number) => {
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds} s`;
};

export const DurationAnalysisTile: React.FC = () => {
  // ... data fetching

  return (
    <div className="p-4 bg-gray-900 border-2 border-cyan-700">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">VERARBEITUNGSDAUER ANALYSE</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-800 border-l-4 border-cyan-500">
          <p className="text-sm text-gray-400">Durchschnittliche Dauer (Gesamt)</p>
          <p className="text-4xl font-black text-cyan-400">{formatMs(AVG_DURATION_MS)}</p>
        </div>
        
        <div className="p-3 bg-gray-800 border-l-4 border-red-500">
          <p className="text-sm text-gray-400">Maximale Dauer (Engpass-Indikator)</p>
          <p className="text-4xl font-black text-red-500 animate-pulse-slow">{formatMs(MAX_DURATION_MS)}</p>
        </div>
      </div>
      
      <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
