import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/generation/progress';

interface GenerationItem {
    generation: number;
    timestamp: string;
    avg_score: number;
    prompts_generated: number;
}

interface EvolutionData {
    progress: GenerationItem[];
}

export const EvolutionProgress: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<EvolutionData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
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
                <h3 className="text-xl font-bold text-red-400 mb-4">🌀 EVOLUTION ERROR</h3>
                <p className="text-gray-400">Generationsfluss unterbrochen</p>
            </div>
        );
    }

    const latestProgress = data.progress.sort((a, b) => b.generation - a.generation);
    const latestGen = latestProgress[0];
    const prevGen = latestProgress[1];
    const growth = prevGen ? latestGen.avg_score - prevGen.avg_score : 0;

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-cyan transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            ⬆️
                        </span>
                        GENERATION WACHSTUM
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">EVOLUTION_DELTA</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${growth > 0 ? 'bg-green-900/30 text-green-400 border-green-700/50' : growth < 0 ? 'bg-red-900/30 text-red-400 border-red-700/50' : 'bg-gray-900/30 text-gray-400 border-gray-700/50'}`}>
                    <span className="font-bold">{growth > 0 ? '+' : ''}{growth.toFixed(1)}</span>
                </div>
            </div>

            {/* AKTUELLE GENERATION */}
            <div className="mb-8 text-center p-5 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">GEN {latestGen.generation}</p>
                <p className="text-5xl font-black text-cyan-300">{latestGen.avg_score.toFixed(1)}</p>
                <p className="text-sm text-gray-500 mt-2">Avg. Score</p>
                
                {/* Wachstums-Pfeil */}
                {growth !== 0 && (
                    <div className="mt-4 flex justify-center items-center gap-2">
                        <span className={`text-2xl ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {growth > 0 ? '↗' : '↘'}
                        </span>
                        <span className={`text-lg font-bold ${growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.abs(growth).toFixed(2)} Punkte
                        </span>
                    </div>
                )}
            </div>

            {/* METRIKEN */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-700/50 transition-colors">
                    <p className="text-gray-400 text-sm mb-2">PROMPTS</p>
                    <p className="text-3xl font-bold text-green-400">{latestGen.prompts_generated}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${Math.min(latestGen.prompts_generated / 2, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-700/50 transition-colors">
                    <p className="text-gray-400 text-sm mb-2">TOTAL GENS</p>
                    <p className="text-3xl font-bold text-purple-400">{data.progress.length}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-purple-600 rounded-full"
                            style={{ width: `${Math.min(data.progress.length * 20, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* LETZTER ZYKLUS */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-400 text-sm">LETZTER ZYKLUS</p>
                    <p className="text-xs text-gray-500">{new Date(latestGen.timestamp).toLocaleTimeString('de-DE')}</p>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-cyan-600 rounded-full animate-pulse"
                        style={{ width: '85%' }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Generation #{latestGen.generation} abgeschlossen
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">EVOLUTION_RATE:</span> {growth > 0 ? 'POSITIV' : 'STAGNANT'}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${growth > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                        <span className="text-xs text-gray-400">GROWTH_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
