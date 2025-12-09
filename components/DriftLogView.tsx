import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/feld/drift';
const DRIFT_KORPER_COUNT = 20; // Gesamtzahl der Drifts
const DRIFT_KORPER_LIST = [ // Top 3 Beispiele aus
  { id: '2025...463270', topic: 'grenzwertig', score: 9, wrapper: 'sigma' },
  { id: '2025...463489', topic: 'technologie', score: 0, wrapper: 'sigma' },
  { id: '2025...463001', topic: 'gesellschaft', score: 0, wrapper: 'deepsweep' },
];

export const DriftLogView: React.FC = () => {
  // ... data fetching

  return (
    <div className="p-4 bg-gray-900 border-2 border-red-700">
      <h3 className="text-lg font-bold text-red-400 mb-4">AKTIVE DRIFTKÖRPER (LOG-VIEW)</h3>
      
      <div className="mb-4">
        <span className="text-sm font-mono text-gray-400">GESAMT DRIFTS: </span>
        <span className="text-3xl font-black text-red-500">{DRIFT_KORPER_COUNT}</span>
      </div>

      <table className="w-full text-left text-xs font-mono">
        <thead>
          <tr className="border-b border-red-700 text-red-400">
            <th className="py-2">ID (gekürzt)</th>
            <th className="py-2">Score</th>
            <th className="py-2">Topic</th>
            <th className="py-2">Wrapper</th>
          </tr>
        </thead>
        <tbody>
          {DRIFT_KORPER_LIST.map((item, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="py-2 text-gray-300">...{item.id.slice(-8)}</td>
              {/* FIX: className dynamisch hinzugefügt */}
              <td className={`py-2 font-bold ${item.score === 0 ? 'text-red-500' : 'text-orange-400'}`}>{item.score}%</td> 
              <td className="py-2 text-cyan-400">{item.topic}</td>
              <td className="py-2 text-gray-400">{item.wrapper}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
