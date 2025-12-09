import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/trends';

interface TrendData {
    status: string;
    current_avg: number;
    trend: string;
    velocity: number;
    predicted_next: number;
    moving_average: number[];
    outliers: { count: number };
}

export const PromptTrends: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TrendData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
                <div className="h-7 w-48 bg-gray-800 rounded mb-6"></div>
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
                <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ TREND ERROR</h3>
                <p className="text-gray-400">Trend-Strom unterbrochen</p>
            </div>
        );
    }

    const isStable = data.trend === 'STABIL';
    const isUp = data.trend.includes('AUFWÄRTS');
    const isDown = data.trend.includes('ABWÄRTS');
    
    const trendColor = isStable ? 'text-green-400' : (isUp ? 'text-cyan-400' : 'text-red-400');
    const trendIcon = isStable ? '→' : (isUp ? '↗' : '↘');
    const bgGlow = isStable ? 'shadow-glow-green' : (isUp ? 'shadow-glow-cyan' : 'shadow-glow-red');

    // Letzte 5 moving averages für Mini-Visualisierung
    const lastAverages = data.moving_average.slice(-5);
    const maxAvg = Math.max(...lastAverages);
    const minAvg = Math.min(...lastAverages);

    return (
        <div className={`p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:${bgGlow} transition-all duration-500 h-full`}>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            📊
                        </span>
                        TREND ANALYSE
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">PROMPT_FLOW_TREND</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${isStable ? 'bg-green-900/30 text-green-400 border-green-700/50' : (isUp ? 'bg-cyan-900/30 text-cyan-400 border-cyan-700/50' : 'bg-red-900/30 text-red-400 border-red-700/50')}`}>
                    <span className="font-bold">{data.trend}</span>
                </div>
            </div>

            {/* AKTUELLER WERT */}
            <div className="mb-8 text-center p-5 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">AKTUELLER DURCHSCHNITT</p>
                <p className="text-6xl font-black text-cyan-300">{data.current_avg.toFixed(1)}</p>
                <div className="flex justify-center items-center gap-3 mt-3">
                    <span className={`text-2xl ${trendColor}`}>{trendIcon}</span>
                    <span className={`text-xl font-bold ${trendColor}`}>{data.trend}</span>
                </div>
            </div>

            {/* TREND VISUALISIERUNG */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-400 text-sm">TREND-VERLAUF</p>
                    <p className="text-sm text-gray-500">Last 5 cycles</p>
                </div>
                
                <div className="h-24 flex items-end gap-1 mb-3">
                    {lastAverages.map((avg, index) => {
                        const height = maxAvg === minAvg ? 35 : ((avg - minAvg) / (maxAvg - minAvg)) * 70;
                        const color = avg > data.current_avg ? 'bg-cyan-600' : (avg < data.current_avg ? 'bg-red-600' : 'bg-gray-600');
                        
                        return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div 
                                    className={`w-full ${color} rounded-t-lg transition-all duration-500`}
                                    style={{ height: `${height}px` }}
                                    title={`Cycle ${index + 1}: ${avg.toFixed(1)}`}
                                ></div>
                                <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
                            </div>
                        );
                    })}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Min: {minAvg.toFixed(1)}</span>
                    <span>Max: {maxAvg.toFixed(1)}</span>
                </div>
            </div>

            {/* METRIKEN */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                    <p className="text-gray-400 text-sm">VELOCITY</p>
                    <p className={`text-2xl font-bold ${data.velocity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {data.velocity > 0 ? '+' : ''}{data.velocity.toFixed(2)}
                    </p>
                </div>
                
                <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                    <p className="text-gray-400 text-sm">PREDICTED</p>
                    <p className="text-2xl font-bold text-yellow-400">{data.predicted_next.toFixed(1)}</p>
                </div>
            </div>

            {/* OUTLIERS */}
            <div className={`p-4 rounded-xl border ${data.outliers.count > 0 ? 'bg-red-900/20 border-red-700/50' : 'bg-gray-900/50 border-gray-800'}`}>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 text-sm">OUTLIERS</p>
                        <p className="text-lg font-bold text-gray-300">{data.outliers.count}</p>
                    </div>
                    {data.outliers.count > 0 && (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                </div>
                {data.outliers.count > 0 && (
                    <p className="text-xs text-red-400 mt-2">⚠️ {data.outliers.count} Feld-Anomalien erkannt</p>
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-red-400">TREND_CYCLES:</span> {data.moving_average.length}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isStable ? 'bg-green-500' : (isUp ? 'bg-cyan-500 animate-pulse' : 'bg-red-500 animate-pulse')}`}></div>
                        <span className="text-xs text-gray-400">LIVE_TREND</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
