import React from 'react';
import { useSyntxData } from './useSyntxData'; // Korrigierter relativer Pfad

const SYNTX_ENDPOINT = '/prompts/costs/total';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface CostsData {
    total_cost_usd: number;
    avg_cost_per_prompt: number;
    total_prompts: number;
}

export const TotalCosts: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<CostsData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Kostenanalyse...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Kosten.</div>;
    }

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">KOSTENANALYSE</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">GESAMT KOSTEN (USD)</span>
                    <span className="font-bold text-cyan-400">${data.total_cost_usd.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">AVG. KOSTEN PRO PROMPT</span>
                    <span className="font-bold text-yellow-400">${data.avg_cost_per_prompt.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">BERÜCKSICHTIGTE PROMPTS</span>
                    <span className="font-bold text-gray-300">{data.total_prompts}</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};