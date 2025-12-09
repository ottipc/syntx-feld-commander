import React from 'react';
import { useSyntxData } from './useSyntxData';
import { StatusLamp } from './StatusLamp'; // WIRD GLEICH ERSTELLT

const SYNTX_ENDPOINT = '/health';

interface HealthData {
    status: string;
    api_version: string;
    timestamp: string;
    queue_accessible: boolean;
    modules: string[];
}

export const FullSystemHealth: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<HealthData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade allgemeinen System Health...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden des allgemeinen System Health.</div>;
    }

    const isHealthy = data.status === 'SYSTEM_GESUND';
    const isQueueAccessible = data.queue_accessible;

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">SYSTEM HEALTH STATUS</h3>
                
                <div className="text-sm space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                        <span className="text-gray-400">STATUS</span>
                        <StatusLamp status={isHealthy ? 'Online' : 'Warning'} label={data.status} />
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                        <span className="text-gray-400">QUEUE ACCESSIBLE</span>
                        <StatusLamp status={isQueueAccessible ? 'Online' : 'Offline'} label={isQueueAccessible ? 'JA' : 'NEIN'} />
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">API VERSION</span>
                        <span className="font-bold text-cyan-400">{data.api_version}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
                <span className="text-gray-500 block mb-1 text-xs font-mono">MODULES</span>
                <p className="text-xs text-gray-600">{data.modules.join(', ')}</p>
            </div>
        </div>
    );
};
