import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/evolution/syntx-vs-normal';

interface ComparisonMetrics {
    avg_score: number;
    perfect_rate: number;
}

interface EvolutionComparisonData {
    comparison: {
        syntx: ComparisonMetrics;
        normal: ComparisonMetrics;
    };
}

export const SyntxVsNormal: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<EvolutionComparisonData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ COMPARISON ERROR</h3>
                <p className="text-gray-400">Vergleichsdaten nicht verfügbar</p>
            </div>
        );
    }

    const syntx = data.comparison.syntx;
    const normal = data.comparison.normal;
    const difference = syntx.avg_score - normal.avg_score;
    const differencePercent = ((difference / normal.avg_score) * 100).toFixed(1);
    const isSyntxBetter = difference > 0;

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-cyan transition-all duration-500 h-full">
            {/* HEADER mit krassem Vergleich */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            ⚡
                        </span>
                        SYNTX VS. NORMAL
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_EFFECT_COMPARISON</p>
                </div>
                <div className={`px-4 py-2 rounded-full ${isSyntxBetter ? 'bg-green-900/30 text-green-400 border border-green-700/50' : 'bg-red-900/30 text-red-400 border border-red-700/50'}`}>
                    <span className="font-bold text-lg">{isSyntxBetter ? '+' : ''}{difference.toFixed(1)}</span>
                    <span className="text-sm ml-1">Punkte</span>
                </div>
            </div>

            {/* VISUAL COMPARISON - Side by Side */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                {/* SYNTX SIDE */}
                <div className="p-5 bg-gradient-to-br from-cyan-900/20 to-green-900/20 rounded-2xl border-2 border-cyan-700/50">
                    <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-cyan-300">SYNTX FELD</h4>
                        <p className="text-xs text-gray-400">Feld-Resonanz aktiv</p>
                    </div>
                    
                    <div className="text-center mb-4">
                        <p className="text-5xl font-black text-cyan-300">{syntx.avg_score.toFixed(1)}</p>
                        <p className="text-sm text-gray-400">Avg. Score</p>
                    </div>
                    
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <div 
                            className="h-full bg-gradient-to-r from-cyan-600 to-green-600 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(syntx.avg_score, 100)}%` }}
                        ></div>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-sm text-gray-400">Perfect Rate</p>
                        <p className="text-2xl font-bold text-green-400">{syntx.perfect_rate.toFixed(1)}%</p>
                    </div>
                </div>

                {/* NORMAL SIDE */}
                <div className="p-5 bg-gradient-to-br from-gray-900/40 to-gray-950/60 rounded-2xl border-2 border-gray-700/50">
                    <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-gray-300">NORMAL</h4>
                        <p className="text-xs text-gray-500">Token-basiert</p>
                    </div>
                    
                    <div className="text-center mb-4">
                        <p className="text-5xl font-black text-gray-400">{normal.avg_score.toFixed(1)}</p>
                        <p className="text-sm text-gray-500">Avg. Score</p>
                    </div>
                    
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <div 
                            className="h-full bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"
                            style={{ width: `${Math.min(normal.avg_score, 100)}%` }}
                        ></div>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Perfect Rate</p>
                        <p className="text-2xl font-bold text-gray-400">0.0%</p>
                    </div>
                </div>
            </div>

            {/* DIFFERENCE VISUALIZATION */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">SYNTX VORTEIL</p>
                    <p className={`text-2xl font-bold ${isSyntxBetter ? 'text-green-400' : 'text-red-400'}`}>
                        {differencePercent}%
                    </p>
                </div>
                <div className="h-3 bg-gray-900 rounded-full border border-gray-800 overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isSyntxBetter ? 'bg-gradient-to-r from-cyan-600 to-green-600' : 'bg-gradient-to-r from-red-600 to-gray-600'}`}
                        style={{ width: `${Math.min(Math.abs(difference) * 10, 100)}%` }}
                    >
                        {/* Shimmer Effect - KORRIGIERT */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-correct"
                                 style={{ width: "200%", transform: "translateX(-50%)" }}>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    {isSyntxBetter ? 'SYNTX übertrifft Normal um' : 'Normal übertrifft SYNTX um'} {Math.abs(difference).toFixed(1)} Punkte
                </p>
            </div>

            {/* FOOTER */}
            <div className="pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">FIELD_EFFICACY:</span> {isSyntxBetter ? 'POSITIV' : 'NEGATIV'}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isSyntxBetter ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-gray-400">{isSyntxBetter ? 'SYNTX SUPERIOR' : 'NORMAL SUPERIOR'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
