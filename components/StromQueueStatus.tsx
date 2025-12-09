import React from 'react';
import { useSyntxData } from './useSyntxData';
import { StatusLamp } from './StatusLamp'; 
import { FlowLoadBar } from './FlowLoadBar';

const SYNTX_ENDPOINT = '/strom/queue/status';
const MAX_QUEUE_DEPTH = 1000; // Annahme: Max. Tiefe für Bar-Visualisierung

interface QueueStatusData {
    status: string;
    processed_today: number;
    queue_depth: number;
}

export const StromQueueStatus: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<QueueStatusData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Strom Queue Status...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Queue.</div>;
    }

    const isReady = data.status === 'QUEUE_READY';
    const queueColor = data.queue_depth > 0 ? 'text-yellow-400' : 'text-green-400';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">STROM QUEUE STATUS</h3>

                <div className="text-sm space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                        <span className="text-gray-400">STATUS</span>
                        <StatusLamp status={isReady ? 'Online' : 'Warning'} label={data.status} />
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">HEUTE PROCESSED</span>
                        <span className="font-bold text-cyan-400">{data.processed_today}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">QUEUE TIEFE</span>
                            <span className={`font-bold ${queueColor}`}>{data.queue_depth}</span>
                        </div>
                        <FlowLoadBar 
                            value={data.queue_depth} 
                            max={MAX_QUEUE_DEPTH} 
                            label="Tiefe"
                            criticalThreshold={500} // Queue ist ab 500 kritisch
                        />
                    </div>
                </div>
            </div>
            
            <p className="text-xs text-gray-600 mt-4 self-end">URL: /strom/queue/status</p>
        </div>
    );
};
