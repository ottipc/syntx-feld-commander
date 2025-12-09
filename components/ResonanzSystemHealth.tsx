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
    if (resonance === 'DRIFT' || resonance === 'KRITISCH') return 'bg-red-900/30 text-red-400 border-red-700/50';
    if (resonance === 'AKTIV' || resonance === 'STABIL') return 'bg-green-900/30 text-green-400 border-green-700/50';
    return 'bg-yellow-900/30 text-yellow-400 border-yellow-700/50';
};

const getResonanceIcon = (resonance: string) => {
    if (resonance === 'DRIFT' || resonance === 'KRITISCH') return '⚠️';
    if (resonance === 'AKTIV' || resonance === 'STABIL') return '⚡';
    return '🌀';
};

export const ResonanzSystemHealth: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<ResonanzSystemData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
                <div className="h-7 w-72 bg-gray-800 rounded mb-6"></div>
                <div className="space-y-4">
                    <div className="h-20 bg-gray-800 rounded-xl"></div>
                    <div className="h-20 bg-gray-800 rounded-xl"></div>
                </div>
            </div>
        );
    }
    
    if (isError || !data) {
        return (
            <div className="p-6 bg-gradient-to-br from-red-900/20 to-gray-950/80 border-2 border-red-700 rounded-3xl shadow-2xl shadow-red-900/30">
                <h3 className="text-xl font-bold text-red-400 mb-4 glitch" data-text="SYSTEM ERROR">⚠️ RESONANZ SYSTEM ERROR</h3>
                <p className="text-gray-400">Feld-Resonanz ausgefallen</p>
            </div>
        );
    }

    const isCritical = data.system_zustand === 'KRITISCH';
    const systemGlow = isCritical ? 'shadow-glow-red' : 'shadow-glow-cyan';

    return (
        <div className={`p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:${systemGlow} transition-all duration-500 h-full`}>
            {/* HEADER mit Cyber-Typografie */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            📡
                        </span>
                        RESONANZ SYSTEM
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_INTEGRITY_SCAN</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${isCritical ? 'bg-red-900/30 text-red-400 border-red-700/50 animate-pulse' : 'bg-green-900/30 text-green-400 border-green-700/50'}`}>
                    <span className="font-bold text-lg">{data.system_zustand}</span>
                </div>
            </div>

            {/* QUEUE RESONANZ - Cyber-Terminal-Style */}
            <div className={`p-5 rounded-2xl border-2 ${getResonanceColor(data.resonanz_felder.queue.resonanz)} mb-6 transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{getResonanceIcon(data.resonanz_felder.queue.resonanz)}</span>
                        <div>
                            <h4 className="text-lg font-bold text-gray-300">QUEUE RESONANZ</h4>
                            <p className="text-xs text-gray-500 font-mono">DATA_STREAM_INTEGRITY</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${getResonanceColor(data.resonanz_felder.queue.resonanz)}`}>
                        {data.resonanz_felder.queue.resonanz}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-black/40 rounded-xl border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">INCOMING</p>
                        <p className="text-3xl font-bold text-cyan-300 font-mono">{data.resonanz_felder.queue.incoming}</p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(data.resonanz_felder.queue.incoming / 5, 100)}%` }}></div>
                        </div>
                    </div>
                    
                    <div className="text-center p-3 bg-black/40 rounded-xl border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">PROCESSED</p>
                        <p className="text-3xl font-bold text-green-300 font-mono">{data.resonanz_felder.queue.processed}</p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min(data.resonanz_felder.queue.processed / 5, 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUALITÄT RESONANZ - Glitch-Effekt bei Problemen */}
            <div className={`p-5 rounded-2xl border-2 ${getResonanceColor(data.resonanz_felder.qualität.resonanz)} transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                            <h4 className="text-lg font-bold text-gray-300">QUALITÄT RESONANZ</h4>
                            <p className="text-xs text-gray-500 font-mono">FIELD_COHERENCE_SCORE</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${getResonanceColor(data.resonanz_felder.qualität.resonanz)}`}>
                        {data.resonanz_felder.qualität.resonanz}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-black/40 rounded-xl border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">AVG. SCORE</p>
                        <p className={`text-3xl font-bold font-mono ${data.resonanz_felder.qualität.durchschnitt > 5 ? 'text-green-300' : 'text-yellow-300'}`}>
                            {data.resonanz_felder.qualität.durchschnitt.toFixed(2)}
                        </p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${data.resonanz_felder.qualität.durchschnitt > 5 ? 'bg-green-600' : 'bg-yellow-600'} rounded-full`} style={{ width: `${Math.min(data.resonanz_felder.qualität.durchschnitt * 10, 100)}%` }}></div>
                        </div>
                    </div>
                    
                    <div className="text-center p-3 bg-black/40 rounded-xl border border-gray-800">
                        <p className="text-gray-400 text-sm mb-1">GENERATIONEN</p>
                        <p className="text-3xl font-bold text-purple-300 font-mono">{data.resonanz_felder.evolution.generationen}</p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${Math.min(data.resonanz_felder.evolution.generationen * 20, 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer mit System-Status */}
            <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">LAST_SCAN:</span> {new Date().toLocaleTimeString('de-DE')}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="text-xs text-gray-400">FIELD_INTEGRITY</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
