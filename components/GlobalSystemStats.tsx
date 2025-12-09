import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/complete-dashboard';

// Typisierung basierend auf der tatsächlichen API-Antwort von /analytics/complete-dashboard
interface SystemHealthData {
    system_health: {
        total_prompts: number;
        avg_score: number;
    };
}

export const GlobalSystemStats: React.FC = () => {
    const { data, isLoading, isError, fullUrl } = useSyntxData<SystemHealthData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade globale Statistiken...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der globalen Statistiken.</div>;
    }

    const { total_prompts, avg_score } = data.system_health;

    return (
        <div className="flex justify-between text-center p-4 bg-gray-900 border-2 border-red-700">
            <div>
                <p className="text-2xl font-bold text-cyan-400">{total_prompts.toLocaleString()}</p>
                <p className="text-xs text-gray-400">GESAMTE PROMPTS HEUTE</p>
            </div>
            <div>
                <p className="text-2xl font-bold text-red-500">{avg_score.toFixed(2)}</p>
                <p className="text-xs text-gray-400">GLOBALER AVG. SCORE</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500 pt-3">URL: {SYNTX_ENDPOINT}</p>
            </div>
        </div>
    );
};
