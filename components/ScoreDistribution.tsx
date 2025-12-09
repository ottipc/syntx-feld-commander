import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/scores/distribution';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface DistributionData {
    distribution: { [key: string]: number };
}

// Konvertiert das Distribution-Objekt in ein Array für die Darstellung (simuliert Chart-Daten)
const mapDistributionToChart = (distribution: { [key: string]: number }): { label: string, value: number, color: string }[] => {
    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    const ranges = Object.keys(distribution).sort((a, b) => {
        // Sortiert nach der unteren Grenze des Bereichs (z.B. '0-20' vor '20-40')
        const numA = parseInt(a.split('-')[0]);
        const numB = parseInt(b.split('-')[0]);
        return numA - numB;
    });

    return ranges.map(range => {
        const count = distribution[range];
        let color = 'text-gray-500';
        if (range.startsWith('0-20')) color = 'text-red-500';
        else if (range.startsWith('80-')) color = 'text-green-500';
        else if (range.startsWith('60-')) color = 'text-yellow-500';

        return {
            label: range,
            value: count,
            percentage: ((count / total) * 100).toFixed(1) + '%',
            color,
        };
    });
};


export const ScoreDistribution: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<DistributionData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Score Distribution...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Score Distribution.</div>;
    }
    
    const chartData = mapDistributionToChart(data.distribution);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">SCORE VERTEILUNG</h3>
            <div className="space-y-2">
                {chartData.map(item => (
                    <div key={item.label} className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-mono w-1/4">{item.label}</span>
                        <div className="flex-1 h-3 bg-gray-700 rounded mr-2">
                            {/* Bar, skaliert zur maximalen Anzahl in der Distribution */}
                            <div 
                                className={`h-3 rounded ${item.color.replace('text-', 'bg-')}`}
                                style={{ width: `${(item.value / chartData[0].value) * 100}%` }}
                            />
                        </div>
                        <span className={`font-bold w-1/4 text-right ${item.color}`}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
