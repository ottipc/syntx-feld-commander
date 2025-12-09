import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/strom/queue/status';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface StromQueueData {
    status: 'QUEUE_READY' | 'QUEUE_BLOCKED';
    processed_today: number;
    queue_depth: number;
}

export const StromQueueStatus: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<StromQueueData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Strom Queue Status...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden des Strom Queue Status.</div>;
    }

    const isReady = data.status === 'QUEUE_READY';
    const color = isReady ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">STROM QUEUE STATUS</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">STATUS</span>
                    <span className={`font-bold ${color}`}>{data.status}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">HEUTE PROCESSED</span>
                    <span className="font-bold text-cyan-400">{data.processed_today}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">QUEUE TIEFE</span>
                    <span className="font-bold text-yellow-400">{data.queue_depth}</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
