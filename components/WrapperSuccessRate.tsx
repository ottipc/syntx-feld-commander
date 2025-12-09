import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/success-rate/by-wrapper';

interface WrapperMetrics {
    total_jobs: number;
    success_rate: number;
    avg_score: number;
}

interface WrapperSuccessData {
    wrappers: { [key: string]: WrapperMetrics };
}

export const WrapperSuccessRate: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<WrapperSuccessData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
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
                <h3 className="text-xl font-bold text-red-400 mb-4">🔄 WRAPPER ERROR</h3>
                <p className="text-gray-400">Wrapper-Daten nicht verfügbar</p>
            </div>
        );
    }

    const wrappers = Object.entries(data.wrappers)
        .map(([name, detail]) => ({
            name: name.toUpperCase().replace('_SYSTEM', '').replace('_', ' '),
            score: detail.avg_score,
            success: detail.success_rate,
            jobs: detail.total_jobs,
            color: detail.avg_score > 10 ? 'text-green-400' : 
                   detail.avg_score > 7 ? 'text-yellow-400' : 'text-red-400',
            bgColor: detail.avg_score > 10 ? 'bg-green-600' : 
                     detail.avg_score > 7 ? 'bg-yellow-600' : 'bg-red-600'
        }))
        .sort((a, b) => b.score - a.score);
    
    const bestWrapper = wrappers[0];
    const totalWrappers = wrappers.length;

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-cyan transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            🔄
                        </span>
                        WRAPPER PERFORMANCE
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">SYSTEM_WRAPPER_METRICS</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-700/50">
                    <span className="font-bold">{totalWrappers} Wrapper</span>
                </div>
            </div>

            {/* BEST WRAPPER HIGHLIGHT */}
            <div className="mb-8 p-4 bg-gradient-to-br from-cyan-900/20 to-gray-900/40 rounded-2xl border border-cyan-700/50">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-gray-400 text-sm">BESTER WRAPPER</p>
                        <p className="text-xl font-bold text-cyan-300">{bestWrapper.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">AVG. SCORE</p>
                        <p className="text-3xl font-black text-green-400">{bestWrapper.score.toFixed(1)}</p>
                    </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-green-600 rounded-full"
                        style={{ width: `${Math.min(bestWrapper.score * 10, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {bestWrapper.jobs} Jobs • {bestWrapper.success.toFixed(1)}% Success Rate
                </p>
            </div>

            {/* WRAPPER LISTE */}
            <div className="space-y-4 mb-8">
                {wrappers.map((wrapper) => (
                    <div key={wrapper.name} className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${wrapper.bgColor}`}></div>
                                <span className="text-gray-300 text-sm">{wrapper.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 text-xs">{wrapper.jobs} Jobs</span>
                                <span className={`text-lg font-bold ${wrapper.color}`}>{wrapper.score.toFixed(1)}</span>
                            </div>
                        </div>
                        
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${wrapper.bgColor} transition-all duration-1000`}
                                style={{ width: `${Math.min(wrapper.score * 10, 100)}%` }}
                            ></div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Success: {wrapper.success.toFixed(1)}%</span>
                            <span className={wrapper.success > 1 ? 'text-green-400' : 'text-red-400'}>
                                {wrapper.success > 1 ? '✅' : '⚠️'} Performance
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* PERFORMANCE-STATUS */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">WRAPPER-EFFIZIENZ</p>
                    <p className={`text-lg font-bold ${bestWrapper.score > 8 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {bestWrapper.score > 8 ? 'HOCH' : 'MODERAT'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${bestWrapper.score > 8 ? 'bg-green-600' : 'bg-yellow-600'}`}
                        style={{ width: `${Math.min(bestWrapper.score * 12.5, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Ø Score: {(wrappers.reduce((sum, w) => sum + w.score, 0) / totalWrappers).toFixed(1)}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">TOTAL_JOBS:</span> {wrappers.reduce((sum, w) => sum + w.jobs, 0)}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${bestWrapper.score > 8 ? 'bg-green-500 animate-pulse-slow' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs text-gray-400">PERFORMANCE_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
