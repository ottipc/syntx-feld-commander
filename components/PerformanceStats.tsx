import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/performance';

interface PerformanceData {
    gesamt: {
        avg_duration_ms: number;
        max_ms: number;
    };
}

export const PerformanceStats: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<PerformanceData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">⚡ PERFORMANCE ERROR</h3>
                <p className="text-gray-400">Performance-Daten nicht verfügbar</p>
            </div>
        );
    }

    const avgSeconds = data.gesamt?.avg_duration_ms ? (data.gesamt.avg_duration_ms / 1000).toFixed(2) : "0.00";
    const maxSeconds = data.gesamt?.max_ms ? (data.gesamt.max_ms / 1000).toFixed(2) : "0.00";
    
    const isFast = data.gesamt.avg_duration_ms < 30000; // Unter 30s = schnell
    const hasBottleneck = data.gesamt.max_ms > 100000; // Über 100s = Engpass
    const avgColor = isFast ? 'text-green-400' : 'text-yellow-400';
    const maxColor = hasBottleneck ? 'text-red-500' : 'text-yellow-400';

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            ⚡
                        </span>
                        PERFORMANCE & LATENZ
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">SYSTEM_RESPONSE_METRICS</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${isFast ? 'bg-green-900/30 text-green-400 border-green-700/50' : 'bg-yellow-900/30 text-yellow-400 border-yellow-700/50'}`}>
                    <span className="font-bold">{isFast ? 'SCHNELL' : 'MODERAT'}</span>
                </div>
            </div>

            {/* DURCHSCHNITTS-LATENZ */}
            <div className="mb-8 text-center p-5 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">DURCHSCHN. DAUER</p>
                <p className="text-6xl font-black text-cyan-300">{avgSeconds}<span className="text-2xl text-gray-400">s</span></p>
                <div className="mt-4 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isFast ? 'bg-green-600' : 'bg-yellow-600'}`}
                        style={{ width: `${Math.min(data.gesamt.avg_duration_ms / 1000, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {isFast ? 'Optimale Response-Zeit' : 'Verbesserungspotential'}
                </p>
            </div>

            {/* MAXIMAL-LATENZ */}
            <div className="mb-8 p-4 bg-gradient-to-br from-gray-900/50 to-gray-950/60 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-gray-400 text-sm">MAXIMALE DAUER</p>
                        <p className={`text-3xl font-bold ${maxColor}`}>{maxSeconds}<span className="text-sm text-gray-400">s</span></p>
                    </div>
                    {hasBottleneck && (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${hasBottleneck ? 'bg-red-600' : 'bg-yellow-600'}`}
                        style={{ width: `${Math.min(data.gesamt.max_ms / 200000, 100)}%` }}
                    ></div>
                </div>
                {hasBottleneck && (
                    <p className="text-xs text-red-400 mt-2 animate-pulse">⚠️ Engpass erkannt</p>
                )}
            </div>

            {/* PERFORMANCE-VERGLEICH */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                    <p className="text-gray-400 text-xs mb-1">RESPONSE-KLASSE</p>
                    <p className={`text-lg font-bold ${isFast ? 'text-green-400' : 'text-yellow-400'}`}>
                        {isFast ? 'FAST' : 'STANDARD'}
                    </p>
                    <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-cyan-600 rounded-full"
                            style={{ width: `${Math.min(100 - (data.gesamt.avg_duration_ms / 1000), 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                    <p className="text-gray-400 text-xs mb-1">ENGPASS-RISIKO</p>
                    <p className={`text-lg font-bold ${hasBottleneck ? 'text-red-400' : 'text-green-400'}`}>
                        {hasBottleneck ? 'HOCH' : 'NIEDRIG'}
                    </p>
                    <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${hasBottleneck ? 'bg-red-600' : 'bg-green-600'}`}
                            style={{ width: `${hasBottleneck ? '80' : '20'}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* SYSTEM-AUSLASTUNG */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">SYSTEM-AUSLASTUNG</p>
                    <p className="text-lg font-bold text-cyan-400">
                        {((data.gesamt.avg_duration_ms / data.gesamt.max_ms) * 100).toFixed(1)}%
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full"
                        style={{ width: `${Math.min((data.gesamt.avg_duration_ms / data.gesamt.max_ms) * 100, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Verhältnis Avg/Max: 1:{((data.gesamt.max_ms / data.gesamt.avg_duration_ms) || 1).toFixed(1)}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-red-400">LATENCY_SCORE:</span> {(100 - (data.gesamt.avg_duration_ms / 1000)).toFixed(1)}/100
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isFast ? 'bg-green-500 animate-pulse-slow' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs text-gray-400">LATENCY_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
