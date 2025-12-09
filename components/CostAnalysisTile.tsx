import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/prompts/costs/total';
const TOTAL_COST_USD = 1.5632; // Gesamtkosten 
const AVG_COST_PER_PROMPT = 0.0047; // Durchschnittskosten 
const TOTAL_PROMPTS = 335; // Gesamtzahl 

export const CostAnalysisTile: React.FC = () => {
  // ... data fetching

  return (
    <div className="p-4 bg-gray-900 border-2 border-cyan-700">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">KOSTEN-BILANZ (TOTAL/PROMPT)</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-800 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-400">GESAMT-KOSTEN (USD)</p>
          <p className="text-4xl font-black text-yellow-400">${TOTAL_COST_USD.toFixed(4)}</p>
        </div>
        
        <div className="p-3 bg-gray-800 border-l-4 border-cyan-500">
          <p className="text-sm text-gray-400">AVG. KOSTEN PROMPT (USD)</p>
          <p className="text-4xl font-black text-cyan-400">${AVG_COST_PER_PROMPT.toFixed(4)}</p>
        </div>
      </div>
      
      <p className="mt-4 text-xs text-gray-600">Total Prompts: {TOTAL_PROMPTS}</p>
      <p className="mt-1 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
    </div>
  );
};
