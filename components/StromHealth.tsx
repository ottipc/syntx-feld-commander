import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/strom/health';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface StromData {
    status: 'STROM_ONLINE' | 'OFFLINE';
}

export const StromHealth: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<StromData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-2 bg-gray-900 border border-red-700 animate-pulse text-gray-500 text-xs">Lade Strom Health...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-2 bg-gray-900 border border-red-700 text-red-500 text-xs">Strom: FEHLER</div>;
    }

    const isOnline = data.status === 'STROM_ONLINE';
    const color = isOnline ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-2 bg-gray-900 border border-red-700 text-xs flex justify-center">
            <span className={`font-bold ${color}`}>STROM FELD: {data.status}</span>
        </div>
    );
};
