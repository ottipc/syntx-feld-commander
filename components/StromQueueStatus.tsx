import React from 'react';
import { useSyntxData } from './useSyntxData';
import { StatusLamp } from './StatusLamp';
import { FlowLoadBar } from './FlowLoadBar';

const SYNTX_ENDPOINT = '/strom/queue/status';
const MAX_QUEUE_DEPTH = 1000;

interface QueueStatusData {
    status: string;
    processed_today: number;
    queue_depth: number;
}

export const StromQueueStatus: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<QueueStatusData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
                <div className="h-7 w-64 bg-gray-800 rounded mb-6"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
            </div>
        );
    }
    
    if (isError || !data) {
        return (
            <div className="p-6 bg-gradient-to-br from-red-900/20 to-gray-950/80 border-2 border-red-700 rounded-3xl shadow-2xl shadow-red-900/30">
                <h3 className="text-xl font-bold text-red-400 mb-4 glitch" data-text="STROM ERROR">⚡ STROM QUEUE ERROR</h3>
                <p className="text-gray-400">Energiefluss unterbrochen</p>
            </div>
        );
    }

    const isReady = data.status === 'QUEUE_READY';
    const isCritical = data.queue_depth > 500;
    const queueColor = isCritical ? 'text-red-400' : (data.queue_depth > 0 ? 'text-yellow-400' : 'text-green-400');
    const energyLevel = Math.min((data.queue_depth / MAX_QUEUE_DEPTH) * 100, 100);

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full flex flex-col justify-between">
            {/* HEADER mit Blitz-Icon */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            ⚡
                        </span>
                        STROM QUEUE
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">ENERGY_FLOW_MONITOR</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${isReady ? 'bg-green-900/30 text-green-400 border-green-700/50' : 'bg-yellow-900/30 text-yellow-400 border-yellow-700/50'}`}>
                    <span className="font-bold text-lg">{data.status}</span>
                </div>
            </div>

            {/* ENERGY LEVEL VISUALIZATION */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">ENERGIELEVEL</p>
                    <p className={`text-2xl font-bold ${queueColor}`}>{energyLevel.toFixed(1)}%</p>
                </div>
                <div className="h-6 bg-gray-900 rounded-full border border-gray-800 overflow-hidden relative">
                    {/* Energie-Balken mit Glow */}
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                            isCritical ? 'bg-gradient-to-r from-red-600 to-red-400' : 
                            data.queue_depth > 0 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 
                            'bg-gradient-to-r from-green-600 to-cyan-400'
                        }`}
                        style={{ width: `${energyLevel}%` }}
                    >
                        {/* Scanline-Animation über dem Balken */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                    
                    {/* Pulsierende Energie-Punkte */}
                    {energyLevel > 30 && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className={`w-1 h-1 rounded-full ${
                                            isCritical ? 'bg-red-400' : 
                                            data.queue_depth > 0 ? 'bg-yellow-400' : 'bg-green-400'
                                        } animate-pulse`}
                                        style={{ animationDelay: `${i * 0.2}s` }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* METRIKS in organischen Blöcken */}
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-700/50 transition-colors">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-sm">HEUTE PROCESSED</p>
                            <StatusLamp status={data.processed_today > 0 ? 'Online' : 'Offline'} label={data.processed_today > 0 ? 'AKTIV' : 'INAKTIV'} />
                        </div>
                        <p className="text-4xl font-bold text-cyan-300 mt-2">{data.processed_today}</p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(data.processed_today / 10, 100)}%` }}></div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-700/50 transition-colors">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-sm">QUEUE TIEFE</p>
                            <p className={`text-xl font-bold ${queueColor}`}>{data.queue_depth}</p>
                        </div>
                        <div className="mt-4">
                            <FlowLoadBar 
                                value={data.queue_depth} 
                                max={MAX_QUEUE_DEPTH} 
                                label="Tiefe"
                                criticalThreshold={500}
                            />
                        </div>
                        {isCritical && (
                            <p className="text-xs text-red-400 mt-2 animate-pulse">⚠️ KRITISCH: Energie-Stau</p>
                        )}
                    </div>
                </div>

                {/* STATUS INFO */}
                <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-sm">SYSTEM STATUS</p>
                            <p className="text-lg font-bold text-gray-300">{data.status}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500 animate-pulse-slow' : 'bg-yellow-500 animate-pulse'}`}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {isReady ? '⚡ Energiefluss optimal' : '⚠️ Energiefluss gestört'}
                    </p>
                </div>
            </div>

            {/* FOOTER mit Scanlines */}
            <div className="mt-8 pt-6 border-t border-gray-800 relative scanlines">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-red-400">POWER_CYCLE:</span> {new Date().toLocaleTimeString('de-DE')}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                        <span className="text-xs text-gray-400">LIVE_STREAM</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
