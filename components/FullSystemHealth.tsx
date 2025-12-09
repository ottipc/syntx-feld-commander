import React from 'react';
import { useSyntxData } from './useSyntxData';
import { StatusLamp } from './StatusLamp';

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
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 w-48 bg-gray-800 rounded-lg"></div>
                    <div className="h-10 w-24 bg-gray-800 rounded-full"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
            </div>
        );
    }
    
    if (isError || !data) {
        return (
            <div className="p-6 bg-gradient-to-br from-red-900/20 to-gray-950/80 border-2 border-red-700 rounded-3xl shadow-2xl shadow-red-900/30">
                <h3 className="text-xl font-bold text-red-400 mb-4">❌ SYSTEM HEALTH ERROR</h3>
                <p className="text-gray-400">Feld-Resonanz unterbrochen. API nicht erreichbar.</p>
            </div>
        );
    }

    const isHealthy = data.status === 'SYSTEM_GESUND';
    const isQueueAccessible = data.queue_accessible;

    // Puls-Effekt basierend auf Health
    const pulseClass = isHealthy ? 'animate-pulse-slow' : 'animate-pulse';

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-shadow duration-500 h-full flex flex-col justify-between">
            <div>
                {/* Header mit pulsierendem Icon */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className={`relative ${pulseClass}`}>
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            🌡️
                        </span>
                        SYSTEM HEALTH STATUS
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${isHealthy ? 'bg-green-900/50 text-green-400 border border-green-700/50' : 'bg-red-900/50 text-red-400 border border-red-700/50'}`}>
                        {data.status}
                    </div>
                </div>
                
                {/* Health Metrics in organischen Karten */}
                <div className="space-y-4">
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">STATUS</span>
                            <StatusLamp status={isHealthy ? 'Online' : 'Error'} label={data.status} />
                        </div>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${isHealthy ? 'bg-green-600' : 'bg-red-600'} rounded-full transition-all duration-1000`} style={{ width: isHealthy ? '100%' : '30%' }}></div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">QUEUE ACCESSIBLE</span>
                            <StatusLamp status={isQueueAccessible ? 'Online' : 'Offline'} label={isQueueAccessible ? 'JA' : 'NEIN'} />
                        </div>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${isQueueAccessible ? 'bg-cyan-600' : 'bg-red-600'} rounded-full transition-all duration-1000`} style={{ width: isQueueAccessible ? '100%' : '30%' }}></div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-700/50 transition-colors">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">API VERSION</span>
                            <span className="font-bold text-cyan-400 text-lg">{data.api_version}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Letzter Check: {new Date(data.timestamp).toLocaleTimeString('de-DE')}</div>
                    </div>
                </div>
            </div>

            {/* Footer mit Modulen */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm font-mono">MODULES</span>
                    <span className="text-xs text-cyan-500">{data.modules.length} aktiv</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.modules.map((module) => (
                        <span 
                            key={module}
                            className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full border border-gray-700 hover:bg-gray-700/50 hover:text-gray-300 transition-colors"
                        >
                            {module}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
