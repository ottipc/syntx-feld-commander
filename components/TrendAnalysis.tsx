import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/trends';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface TrendsData {
    current_avg: number;
    trend: 'STABIL' | 'ABWÄRTS-DRIFT' | 'AUFWÄRTS-SCHWUNG';
    predicted_next: number;
    moving_average: number[];
}

export const TrendAnalysis: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TrendsData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Trend-Analyse...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Trend-Daten.</div>;
    }
    
    const { current_avg, trend, predicted_next, moving_average } = data;
    
    let trendColor = 'text-cyan-400';
    let icon = '▶';
    if (trend === 'ABWÄRTS-DRIFT') {
        trendColor = 'text-red-500';
        icon = '▼';
    } else if (trend === 'AUFWÄRTS-SCHWUNG') {
        trendColor = 'text-green-500';
        icon = '▲';
    }

    // Zeigt nur die letzten 5 gleitenden Durchschnitte
    const lastAverages = moving_average.slice(-5);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">FELD TREND ANALYSE</h3>
            
            <p className="text-5xl font-black" style={{ color: trendColor }}>{current_avg.toFixed(2)}</p>
            <p className="text-xl font-bold font-mono mb-3" style={{ color: trendColor }}>{icon} {trend}</p>
            
            <div className="text-sm text-gray-400">
                <p>Nächste Vorhersage: <span className="font-bold text-yellow-400">{predicted_next.toFixed(2)}</span></p>
                <p>Letzte Avg. Scores: {lastAverages.join(', ')}</p>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
