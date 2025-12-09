import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/resonanz/queue';

// Typisierung basierend auf der tatsächlichen API-Antwort von /resonanz/queue
interface QueueData {
    resonanz_zustand: 'ÜBERLASTET' | 'NORMAL';
    felder: {
        incoming: number;
        processed: number;
        error: number;
    };
    gesamt: number;
}

export const QueueLoad: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<QueueData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Queue-Status...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Queue-Daten.</div>;
    }

    const { resonanz_zustand, felder, gesamt } = data;
    const color = resonanz_zustand === 'ÜBERLASTET' ? 'text-red-500' : 'text-green-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">QUEUE LAST & STROM</h3>
            
            <p className="text-xl font-bold font-mono mb-2" style={{ color }}>STATUS: {resonanz_zustand} ({gesamt} Jobs)</p>
            
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="border-r border-gray-700 pr-2">
                    <p className="text-3xl font-bold text-yellow-400">{felder.incoming}</p>
                    <p className="text-xs text-gray-400">INCOMING</p>
                </div>
                <div className="border-r border-gray-700 pr-2">
                    <p className="text-3xl font-bold text-green-400">{felder.processed}</p>
                    <p className="text-xs text-gray-400">PROCESSED</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-red-500">{felder.error}</p>
                    <p className="text-xs text-gray-400">FEHLER</p>
                </div>
            </div>
        </div>
    );
};
