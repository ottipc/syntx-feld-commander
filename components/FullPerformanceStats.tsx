import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/performance';

interface WrapperPerformance {
    avg_ms: number;
    min_ms: number;
    max_ms: number;
    count: number;
}

interface PerformanceData {
    status: string;
    gesamt: WrapperPerformance & { total_jobs: number };
    by_wrapper: { [key: string]: WrapperPerformance };
}

export const FullPerformanceStats: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<PerformanceData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
                <div className="h-7 w-72 bg-gray-800 rounded mb-6"></div>
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
                <h3 className="text-xl font-bold text-red-400 mb-4">📊 FULL PERFORMANCE ERROR</h3>
                <p className="text-gray-400">Performance-Daten nicht verfügbar</p>
            </div>
        );
    }

    const { gesamt, by_wrapper } = data;
    const wrappers = Object.entries(by_wrapper)
        .sort(([, a], [, b]) => b.count - a.count)
        .slice(0, 4); // Top 4 Wrapper
    
    const totalJobs = gesamt.total_jobs;
    const avgOverall = gesamt?.avg_ms ? (gesamt.avg_ms / 1000).toFixed(2) : "0.00";
    const maxOverall = gesamt?.max_ms ? (gesamt.max_ms / 1000).toFixed(2) : "0.00";
    const systemLoad = gesamt?.avg_ms && gesamt?.max_ms ? ((gesamt.avg_ms / gesamt.max_ms) * 100).toFixed(1) : "0.0";

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            📊
                        </span>
                        FULL PERFORMANCE ANALYSE
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">SYSTEM_PERFORMANCE_MATRIX</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-red-900/30 text-red-400 border border-red-700/50">
                    <span className="font-bold">{totalJobs} Jobs</span>
                </div>
            </div>

            {/* GESAMT-ÜBERSICHT */}
            <div className="mb-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                        <p className="text-gray-400 text-sm mb-2">AVG. DAUER</p>
                        <p className="text-4xl font-black text-cyan-300">{avgOverall}<span className="text-sm text-gray-400">s</span></p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-cyan-600 rounded-full"
                                style={{ width: `${Math.min(parseFloat(avgOverall || "0") * 10, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                        <p className="text-gray-400 text-sm mb-2">MAX. DAUER</p>
                        <p className="text-4xl font-black text-yellow-400">{maxOverall}<span className="text-sm text-gray-400">s</span></p>
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-yellow-600 rounded-full"
                                style={{ width: `${Math.min(parseFloat(maxOverall || "0") / 10, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-950/60 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-gray-400 text-sm">SYSTEM-AUSLASTUNG</p>
                        <p className={`text-xl font-bold ${parseFloat(systemLoad || "0") > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {systemLoad}%
                        </p>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${parseFloat(systemLoad || "0") > 50 ? 'bg-yellow-600' : 'bg-green-600'}`}
                            style={{ width: `${systemLoad}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* WRAPPER PERFORMANCE */}
            <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-300 mb-4">PERFORMANCE BY WRAPPER</h4>
                <div className="space-y-4">
                    {wrappers.map(([wrapper, stats]) => {
                        const avgSec = (stats.avg_ms / 1000).toFixed(2);
                        const maxSec = (stats.max_ms / 1000).toFixed(2);
                        const isFast = stats.avg_ms < 30000;
                        const color = isFast ? 'text-green-400' : 'text-yellow-400';
                        const bgColor = isFast ? 'bg-green-600' : 'bg-yellow-600';
                        
                        return (
                            <div key={wrapper} className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${bgColor}`}></div>
                                        <span className="text-gray-300 text-sm capitalize">{wrapper}</span>
                                        <span className="text-xs text-gray-500">({stats.count})</span>
                                    </div>
                                    <span className={`text-lg font-bold ${color}`}>{avgSec}s</span>
                                </div>
                                
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${bgColor}`}
                                        style={{ width: `${Math.min(stats.avg_ms / 10000, 100)}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Min: {(stats.min_ms / 1000).toFixed(2)}s</span>
                                    <span>Max: {maxSec}s</span>
                                    <span className={isFast ? 'text-green-400' : 'text-yellow-400'}>
                                        {isFast ? 'Fast' : 'Moderate'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* PERFORMANCE-SUMMARY */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">PERFORMANCE-STATUS</p>
                    <p className={`text-lg font-bold ${parseFloat(avgOverall || "0") < 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {parseFloat(avgOverall || "0") < 30 ? 'OPTIMAL' : 'ACCEPTABLE'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${parseFloat(avgOverall || "0") < 30 ? 'bg-green-600' : 'bg-yellow-600'}`}
                        style={{ width: `${Math.min(100 - parseFloat(avgOverall || "0"), 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Ø {avgOverall}s pro Job • {wrappers.length} aktive Wrapper
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-red-400">TOTAL_PROCESSING:</span> {(gesamt.avg_ms * totalJobs / 1000).toFixed(0)}s
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${parseFloat(avgOverall || "0") < 30 ? 'bg-green-500 animate-pulse-slow' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs text-gray-400">PERFORMANCE_TRACKING</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
