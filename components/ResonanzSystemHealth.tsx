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

const getResonanceColor = (resonance: string) => {
    if (resonance === 'DRIFT' || resonance === 'KRITISCH') return 'text-red-400 bg-red-800/30';
    if (resonance === 'AKTIV') return 'text-green-400 bg-green-800/30';
    return 'text-yellow-400 bg-yellow-800/30';
};

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
        <div className="p-4 bg-gray-900 border-2 border-red-700 h-full">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex justify-between items-center">
                RESONANZ SYSTEM HEALTH
                <span className={`text-xs font-mono px-2 py-1 rounded ${data.system_zustand === 'KRITISCH' ? 'bg-red-800/50 text-red-300' : 'bg-green-800/50 text-green-300'}`}>
                    {data.system_zustand}
                </span>
            </h3>
            
            <div className="text-sm space-y-4">
                {/* QUEUE RESONANZ */}
                <div className="border border-gray-800 p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 font-semibold">QUEUE RESONANZ</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${getResonanceColor(data.resonanz_felder.queue.resonanz)}`}>
                            {data.resonanz_felder.queue.resonanz}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <p>Incoming: <span className="text-cyan-400">{data.resonanz_felder.queue.incoming}</span></p>
                        <p>Processed: <span className="text-green-500">{data.resonanz_felder.queue.processed}</span></p>
                    </div>
                </div>

                {/* QUALITÄT RESONANZ */}
                <div className="border border-gray-800 p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 font-semibold">QUALITÄT RESONANZ</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${getResonanceColor(data.resonanz_felder.qualität.resonanz)}`}>
                            {data.resonanz_felder.qualität.resonanz}
                        </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <p>Durchschnitt Score: <span className="text-cyan-400">{data.resonanz_felder.qualität.durchschnitt.toFixed(2)}</span></p>
                        <p>Generationen: <span className="text-green-500">{data.resonanz_felder.evolution.generationen}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
