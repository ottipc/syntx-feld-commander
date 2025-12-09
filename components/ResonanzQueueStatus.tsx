import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/resonanz/queue';

interface ResonanzQueueData {
    status: string;
    resonanz_zustand: string;
    felder: {
        incoming: number;
        processing: number;
        processed: number;
        error: number;
    };
    gesamt: number;
    flow_rate: number;
}

export const ResonanzQueueStatus: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<ResonanzQueueData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Resonanz Queue Status...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Resonanz Queue.</div>;
    }

    const color = data.resonanz_zustand === 'ÜBERLASTET' ? 'text-yellow-500' : 'text-green-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">RESONANZ QUEUE ({data.resonanz_zustand})</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">GESAMT JOBS</span>
                    <span className="font-bold text-gray-300">{data.gesamt}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">INCOMING</span>
                    <span className="font-bold text-cyan-400">{data.felder.incoming}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">PROCESSED</span>
                    <span className="font-bold text-green-500">{data.felder.processed}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">ERROR</span>
                    <span className="font-bold text-red-500">{data.felder.error}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2 mt-2">
                    <span className="text-gray-400">FLOW RATE (Jobs/s)</span>
                    <span className={`font-bold ${color}`}>{data.flow_rate.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
