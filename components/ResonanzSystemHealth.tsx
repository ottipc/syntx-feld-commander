import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/resonanz/system';

interface ResonanzSystemData {
    status: string;
    system_zustand: string;
    resonanz_felder: {
        queue: { incoming: number; processed: number; resonanz: string; };
        qualität: { durchschnitt: number; resonanz: string; };
        evolution: { generationen: number; resonanz: string; };
    };
}

export const ResonanzSystemHealth: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<ResonanzSystemData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Resonanz System Health...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der System-Resonanz.</div>;
    }

    const stateColor = data.system_zustand === 'KRITISCH' ? 'text-red-500' : 'text-green-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">RESONANZ SYSTEM HEALTH ({data.status})</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">SYSTEM ZUSTAND</span>
                    <span className={`font-bold ${stateColor}`}>{data.system_zustand}</span>
                </div>
                
                <hr className="border-gray-800" />

                <div className="space-y-1">
                    <p className="text-gray-400 font-semibold">QUEUE RESONANZ:</p>
                    <div className="ml-3">
                        <p>Incoming: <span className="text-cyan-400">{data.resonanz_felder.queue.incoming}</span></p>
                        <p>Processed: <span className="text-green-500">{data.resonanz_felder.queue.processed}</span></p>
                        <p>Resonanz: <span className="text-yellow-500">{data.resonanz_felder.queue.resonanz}</span></p>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-400 font-semibold">QUALITÄT RESONANZ:</p>
                    <div className="ml-3">
                        <p>Durchschnitt: <span className="text-cyan-400">{data.resonanz_felder.qualität.durchschnitt.toFixed(2)}</span></p>
                        <p>Resonanz: <span className="text-yellow-500">{data.resonanz_felder.qualität.resonanz}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
