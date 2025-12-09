import React from 'react';
import { useSyntxData } from './useSyntxData';
import { FlowLoadBar } from './FlowLoadBar'; // WIRD GLEICH ERSTELLT

const SYNTX_ENDPOINT = '/resonanz/queue';
const MAX_FLOW_RATE = 100; // Annahme: Maximale Flow Rate für die Skala

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

    const isOverloaded = data.resonanz_zustand === 'ÜBERLASTET';
    const stateColor = isOverloaded ? 'text-yellow-500' : 'text-green-500';
    const errorCountColor = data.felder.error > 0 ? 'text-red-500' : 'text-green-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-red-400 mb-4 flex justify-between items-center">
                    RESONANZ QUEUE 
                    <span className={`text-xs font-mono px-2 py-1 rounded ${isOverloaded ? 'bg-yellow-800/50 text-yellow-300' : 'bg-green-800/50 text-green-300'}`}>
                        {data.resonanz_zustand}
                    </span>
                </h3>
                
                <div className="text-sm space-y-2 mb-4">
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
                        <span className={`font-bold ${errorCountColor}`}>{data.felder.error}</span>
                    </div>
                </div>
            </div>

            {/* Visuelle Verlinkung: Flow Rate als Bar */}
            <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">FLOW RATE (Jobs/s)</span>
                    <span className={`font-bold ${stateColor}`}>{data.flow_rate.toFixed(2)}</span>
                </div>
                <FlowLoadBar value={data.flow_rate} max={MAX_FLOW_RATE} label="Flow" />
            </div>
        </div>
    );
};
