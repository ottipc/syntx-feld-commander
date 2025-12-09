import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/success-rate/by-wrapper';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface WrapperMetrics {
    total_jobs: number;
    success_rate: number;
    avg_score: number;
}

interface WrapperSuccessData {
    wrappers: { [key: string]: WrapperMetrics };
}

// Konvertiert das Wrapper-Objekt in ein Array und sortiert nach avg_score
const mapWrappersToChart = (wrappers: { [key: string]: WrapperMetrics }): { name: string, score: number, color: string }[] => {
    return Object.entries(wrappers)
        .map(([name, detail]) => ({
            name: name.toUpperCase().replace('_SYSTEM', ''),
            score: detail.avg_score,
            color: detail.avg_score > 10 ? 'text-cyan-400' : 'text-red-500',
        }))
        .sort((a, b) => b.score - a.score);
};

export const WrapperSuccessRate: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<WrapperSuccessData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Wrapper Erfolgsrate...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Wrapper-Daten.</div>;
    }

    const chartData = mapWrappersToChart(data.wrappers);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">AVG. SCORE BY WRAPPER</h3>
            
            <div className="space-y-3">
                {chartData.map(item => (
                    <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-gray-400 w-1/3">{item.name}</span>
                        <div className="flex-1 h-2 bg-gray-700 rounded mr-2 mt-1">
                            {/* Balken relativ zur höchsten Punktzahl (Human) */}
                            <div 
                                className={`h-2 rounded ${item.color.replace('text-', 'bg-')}`}
                                style={{ width: `${(item.score / chartData[0].score) * 100}%` }}
                            />
                        </div>
                        <span className={`font-bold ${item.color} w-1/4 text-right`}>
                            {item.score.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
