import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/scores/distribution';

interface DistributionData {
    distribution: { [key: string]: number };
}

export const ScoreDistribution: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<DistributionData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">📊 DISTRIBUTION ERROR</h3>
                <p className="text-gray-400">Score-Verteilung nicht verfügbar</p>
            </div>
        );
    }

    // Sortiere die Ranges für korrekte Anzeige
    const ranges = Object.keys(data.distribution).sort((a, b) => {
        const numA = parseInt(a.split('-')[0]);
        const numB = parseInt(b.split('-')[0]);
        return numA - numB;
    });
    
    const chartData = ranges.map(range => {
        const count = data.distribution[range];
        let color = 'bg-gray-600';
        let textColor = 'text-gray-400';
        
        if (range.startsWith('0-20')) {
            color = 'bg-red-600';
            textColor = 'text-red-400';
        } else if (range.startsWith('20-40')) {
            color = 'bg-yellow-600';
            textColor = 'text-yellow-400';
        } else if (range.startsWith('40-60')) {
            color = 'bg-blue-600';
            textColor = 'text-blue-400';
        } else if (range.startsWith('60-80')) {
            color = 'bg-cyan-600';
            textColor = 'text-cyan-400';
        } else if (range.startsWith('80-')) {
            color = 'bg-green-600';
            textColor = 'text-green-400';
        }
        
        return { range, count, color, textColor };
    });
    
    const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);
    const maxCount = Math.max(...chartData.map(item => item.count));
    const criticalCount = chartData.find(item => item.range === '0-20')?.count || 0;
    const excellentCount = chartData.filter(item => item.range.startsWith('80-')).reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-cyan transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            📊
                        </span>
                        SCORE VERTEILUNG
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_QUALITY_HISTOGRAM</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-700/50">
                    <span className="font-bold">{totalCount} Prompts</span>
                </div>
            </div>

            {/* KRITISCHE/EXZELLENTE HIGHLIGHT */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-red-900/20 to-gray-900/40 rounded-xl border border-red-700/50">
                    <p className="text-gray-400 text-sm mb-2">KRITISCHE (0-20)</p>
                    <p className="text-3xl font-black text-red-400">{criticalCount}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${Math.min((criticalCount / totalCount) * 500, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {((criticalCount / totalCount) * 100).toFixed(1)}% aller Prompts
                    </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-900/20 to-gray-900/40 rounded-xl border border-green-700/50">
                    <p className="text-gray-400 text-sm mb-2">EXZELLENTE (&gt;=80)</p>
                    <p className="text-3xl font-black text-green-400">{excellentCount}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${Math.min((excellentCount / totalCount) * 500, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        {((excellentCount / totalCount) * 100).toFixed(1)}% aller Prompts
                    </p>
                </div>
            </div>

            {/* HISTOGRAM VISUAL */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-400 text-sm">SCORE-HISTOGRAMM</p>
                    <p className="text-sm text-gray-500">Anzahl pro Range</p>
                </div>
                
                <div className="h-48 flex items-end gap-1 mb-3">
                    {chartData.map((item) => {
                        const height = maxCount > 0 ? (item.count / maxCount) * 140 : 0;
                        
                        return (
                            <div key={item.range} className="flex-1 flex flex-col items-center">
                                <div 
                                    className={`w-full ${item.color} rounded-t-lg transition-all duration-700 hover:opacity-90`}
                                    style={{ height: `${height}px` }}
                                    title={`${item.range}: ${item.count} Prompts`}
                                >
                                    {/* Shimmer-Effekt für hohe Balken */}
                                    {height > 50 && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"></div>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{item.range}</span>
                            </div>
                        );
                    })}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Min: 0</span>
                    <span>Max: {maxCount}</span>
                </div>
            </div>

            {/* SCORE-RANGES LISTE */}
            <div className="space-y-2 mb-8">
                {chartData.map((item) => {
                    const percentage = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
                    
                    return (
                        <div key={item.range} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 w-1/4">
                                <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                                <span className="text-gray-400 font-mono">{item.range}</span>
                            </div>
                            <div className="flex-1 h-2 bg-gray-800 rounded-full mr-2">
                                <div 
                                    className={`h-full rounded-full ${item.color}`}
                                    style={{ width: `${Math.min(percentage * 5, 100)}%` }}
                                ></div>
                            </div>
                            <span className={`font-bold w-1/6 text-right ${item.textColor}`}>
                                {item.count}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* QUALITÄTS-STATUS */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">VERTEILUNGS-QUALITÄT</p>
                    <p className={`text-lg font-bold ${excellentCount > criticalCount ? 'text-green-400' : 'text-red-400'}`}>
                        {excellentCount > criticalCount ? 'POSITIV' : 'KRITISCH'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${excellentCount > criticalCount ? 'bg-green-600' : 'bg-red-600'}`}
                        style={{ width: `${Math.min((excellentCount / (criticalCount || 1)) * 50, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Verhältnis Exzellent/Kritisch: {(excellentCount / (criticalCount || 1)).toFixed(1)}:1
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">DISTRIBUTION_SCORE:</span> {((excellentCount / totalCount) * 100).toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${excellentCount > criticalCount ? 'bg-green-500 animate-pulse-slow' : 'bg-red-500 animate-pulse'}`}></div>
                        <span className="text-xs text-gray-400">QUALITY_DISTRIBUTION</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
