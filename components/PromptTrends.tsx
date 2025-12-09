import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/trends';

interface TrendData {
    status: string;
    current_avg: number;
    trend: string;
    velocity: number;
    predicted_next: number;
    moving_average: number[];
    outliers: { count: number };
}

export const PromptTrends: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TrendData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Prompt Trends...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Trends.</div>;
    }

    const trendColor = data.trend === 'STABIL' ? 'text-green-500' : 'text-red-500';
    const trendIcon = data.trend === 'STABIL' ? '▲' : '▼'; // Vereinfachte Darstellung

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">PROMPT TREND ANALYSE</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">AKTUELLE AVG.</span>
                    <span className="font-bold text-cyan-400">{data.current_avg.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">TREND / STATUS</span>
                    <span className={`font-bold ${trendColor}`}>{trendIcon} {data.trend}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">VELOCITY</span>
                    <span className="font-bold text-yellow-400">{data.velocity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2 mt-2">
                    <span className="text-gray-400">PREDICTED NÄCHSTES AVG.</span>
                    <span className="font-bold text-gray-300">{data.predicted_next.toFixed(2)}</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Outliers gezählt: {data.outliers.count}</p>
        </div>
    );
};
