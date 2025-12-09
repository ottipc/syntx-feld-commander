import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/health';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface HealthData {
    status: 'SYSTEM_GESUND' | 'WARNUNG' | 'FEHLER';
    api_version: string;
}

export const SystemHealth: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<HealthData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-2 bg-gray-900 border border-red-700 animate-pulse text-gray-500 text-xs">Lade System Health...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-2 bg-gray-900 border border-red-700 text-red-500 text-xs">Health: FEHLER</div>;
    }

    const isHealthy = data.status === 'SYSTEM_GESUND';
    const color = isHealthy ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-2 bg-gray-900 border border-red-700 text-xs flex justify-between">
            <span className={`font-bold ${color}`}>STATUS: {data.status}</span>
            <span className="text-gray-400">API V{data.api_version}</span>
        </div>
    );
};
