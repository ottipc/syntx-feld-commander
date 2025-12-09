import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/evolution/syntx-vs-normal';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface ComparisonMetrics {
    avg_score: number;
    perfect_rate: number;
}

interface EvolutionComparisonData {
    comparison: {
        syntx: ComparisonMetrics;
        normal: ComparisonMetrics;
    };
}

export const SyntxVsNormal: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<EvolutionComparisonData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Evolution-Vergleich...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden des Vergleichs.</div>;
    }

    const syntxAvg = data.comparison.syntx.avg_score;
    const normalAvg = data.comparison.normal.avg_score;
    const perfectRate = data.comparison.syntx.perfect_rate;

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">SYNTX VS. NORMAL (EVOLUTION)</h3>
            
            <div className="text-sm space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-400">SYNTX FELD AVG. SCORE</span>
                    <span className="text-2xl font-black text-green-400">{syntxAvg.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">NORM. PROMPT AVG. SCORE</span>
                    <span className="text-2xl font-black text-red-500">{normalAvg.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400">PERFEKTRATE (SYNTX)</span>
                    <span className="font-bold text-yellow-400">{perfectRate.toFixed(2)}%</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
