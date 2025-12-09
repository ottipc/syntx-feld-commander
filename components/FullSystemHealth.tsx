import React from 'react';
import { useSyntxData } from './useSyntxData';

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

    const statusColor = data.status === 'SYSTEM_GESUND' ? 'text-green-500' : 'text-yellow-500';
    const queueColor = data.queue_accessible ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">SYSTEM HEALTH STATUS</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">STATUS</span>
                    <span className={`font-bold ${statusColor}`}>{data.status}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">API VERSION</span>
                    <span className="font-bold text-cyan-400">{data.api_version}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">QUEUE ACCESSIBLE</span>
                    <span className={`font-bold ${queueColor}`}>{data.queue_accessible ? 'JA' : 'NEIN'}</span>
                </div>
                <div className="mt-3">
                    <span className="text-gray-400 block mb-1">MODULES</span>
                    <p className="text-xs text-gray-500">{data.modules.join(', ')}</p>
                </div>
            </div>
        </div>
    );
};
