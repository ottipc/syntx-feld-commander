import React from 'react';
import { useSyntxData } from './useSyntxData';
import { FlowLoadBar } from './FlowLoadBar';

const SYNTX_ENDPOINT = '/resonanz/queue';
const MAX_FLOW_RATE = 100;

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
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
                <div className="h-7 w-64 bg-gray-800 rounded mb-6"></div>
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
                <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ RESONANZ QUEUE ERROR</h3>
                <p className="text-gray-400">Feld-Strom unterbrochen</p>
            </div>
        );
    }

    const isOverloaded = data.resonanz_zustand === 'ÜBERLASTET';
    const stateColor = isOverloaded ? 'text-yellow-500' : 'text-green-500';
    const bgGlow = isOverloaded ? 'shadow-glow-yellow' : 'shadow-glow-cyan';
    const errorCountColor = data.felder.error > 0 ? 'text-red-500' : 'text-green-400';

    return (
        <div className={`p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:${bgGlow} transition-all duration-500 h-full flex flex-col justify-between`}>
            <div>
                {/* Header mit Status-Badge */}
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            ⚡
                        </span>
                        RESONANZ QUEUE
                    </h3>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${isOverloaded ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50' : 'bg-green-900/30 text-green-300 border-green-700/50'}`}>
                        {data.resonanz_zustand}
                    </div>
                </div>
                
                {/* Gesamt Jobs mit Puls-Effekt */}
                <div className="mb-8 text-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <p className="text-gray-400 text-sm mb-2">GESAMT JOBS IM STROM</p>
                    <p className="text-5xl font-black text-cyan-300 animate-pulse-slow">{data.gesamt}</p>
                </div>

                {/* Queue-Felder als organische Kacheln */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-700/50 transition-colors">
                        <p className="text-gray-400 text-sm mb-1">INCOMING</p>
                        <p className="text-3xl font-bold text-cyan-400">{data.felder.incoming}</p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(data.felder.incoming / 10, 100)}%` }}></div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-green-700/50 transition-colors">
                        <p className="text-gray-400 text-sm mb-1">PROCESSED</p>
                        <p className="text-3xl font-bold text-green-400">{data.felder.processed}</p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min(data.felder.processed / 10, 100)}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Error-Feld mit Warnung */}
                <div className={`p-4 rounded-xl border ${data.felder.error > 0 ? 'bg-red-900/20 border-red-700/50' : 'bg-gray-900/50 border-gray-800'}`}>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">ERROR</p>
                        <p className={`text-2xl font-bold ${errorCountColor}`}>{data.felder.error}</p>
                    </div>
                    {data.felder.error > 0 && (
                        <p className="text-xs text-red-400 mt-2">⚠️ Feld-Resonanz gestört</p>
                    )}
                </div>
            </div>

            {/* Footer mit Flow Rate */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-gray-500 text-sm">FLOW RATE</p>
                        <p className={`text-2xl font-bold ${stateColor}`}>{data.flow_rate.toFixed(2)} <span className="text-sm text-gray-400">Jobs/s</span></p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${isOverloaded ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                </div>
                <FlowLoadBar value={data.flow_rate} max={MAX_FLOW_RATE} label="Flow" criticalThreshold={80} />
                <p className="text-xs text-gray-600 mt-2 text-right">Strom-Frequenz: {(data.flow_rate / MAX_FLOW_RATE * 100).toFixed(1)}%</p>
            </div>
        </div>
    );
};
