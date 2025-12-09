import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/analytics/success-rate/by-wrapper';
const WRAPPER_DATA = [ // Daten aus
  { name: 'SYNTAX SYSTEM', score: 6.45, success: 0.0, color: 'text-red-500' }, 
  { name: 'SIGMA', score: 8.31, success: 2.8, color: 'text-orange-400' }, 
  { name: 'DEEPSWEEP', score: 9.00, success: 0.0, color: 'text-red-500' }, 
  { name: 'HUMAN', score: 14.38, success: 0.0, color: 'text-cyan-400' }, 
];

export const WrapperPerformanceTile: React.FC = () => {
  // ... data fetching

  return (
    <div className="p-4 bg-gray-900 border-2 border-cyan-700">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">WRAPPER PERFORMANCE (ERFOLGSQUOTE)</h3>
      
      <table className="w-full text-left text-sm font-mono">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th className="py-2">Wrapper</th>
            <th className="py-2 text-right">Avg. Score</th>
            <th className="py-2 text-right">Success Rate</th>
          </tr>
        </thead>
        <tbody>
          {WRAPPER_DATA.map((item) => (
            <tr key={item.name} className="border-b border-gray-800">
              <td className="py-2 text-gray-300">{item.name}</td>
              {/* FIX: className hinzugefügt */}
              <td className={`py-2 text-right ${item.color}`}>{item.score.toFixed(2)}%</td>
              {/* FIX: className hinzugefügt */}
              <td className={`py-2 text-right ${item.success > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.success.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
