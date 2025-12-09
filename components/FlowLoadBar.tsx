import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/resonanz/queue';
const INCOMING = 245; // Vom Endpunkt /resonanz/queue
const TOTAL_CAPACITY = 588; // Vom Endpunkt /resonanz/queue
const FLOW_RATE = 56.97; // Vom Endpunkt /resonanz/queue
const ZUSTAND = "ÜBERLASTET"; // Vom Endpunkt /resonanz/queue
const LOAD_PERCENT = (INCOMING / TOTAL_CAPACITY) * 100;

export const FlowLoadBar: React.FC = () => {
  // ... data fetching
  const color = LOAD_PERCENT > 40 ? 'bg-red-600' : 'bg-green-600';

  return (
    <div className="p-4 bg-gray-900 border-2 border-red-700">
      <h3 className="text-lg font-bold text-red-400 mb-4">VERARBEITUNGS-FLUSS (QUEUE LAST)</h3>
      
      <div className="w-full bg-gray-800 h-6">
        <div 
          className={`h-full ${color} transition-all duration-500`} 
          style={{ width: `${LOAD_PERCENT.toFixed(1)}%`, boxShadow: `0 0 10px ${color}` }}
        >
          <span className="p-1 text-sm font-bold text-white mix-blend-difference">
            {INCOMING} / {TOTAL_CAPACITY}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-sm font-mono text-gray-400">
        <span>STATUS: {ZUSTAND}</span>
        <span className="text-cyan-400">FLOW RATE: {FLOW_RATE.toFixed(2)} FpS</span>
      </div>
    </div>
  );
};
