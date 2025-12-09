import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/generation/progress';

interface ProgressEntry {
    generation: number;
    timestamp: string;
    avg_score: number;
    sample_count: number;
    prompts_generated: number;
}

interface EvolutionProgressData {
    status: string;
    generationen: number;
    progress: ProgressEntry[];
}

export const EvolutionProgressFull: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<EvolutionProgressData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">⚠️ EVOLUTION ERROR</h3>
                <p className="text-gray-400">Generationsstrom unterbrochen</p>
            </div>
        );
    }

    // Zeige nur die letzten 4 Generationen
    const recentProgress = data.progress.slice(-4).reverse();
    const latestGen = recentProgress[0];

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-cyan transition-all duration-500 h-full">
            {/* HEADER mit Generations-Icon */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            🌀
                        </span>
                        GENERATIONEN
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">EVOLUTION_CYCLE_{data.generationen}</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-700/50">
                    <span className="font-bold text-lg">GEN {latestGen.generation}</span>
                </div>
            </div>

            {/* AKTUELLE GENERATION */}
            <div className="mb-8 p-4 bg-black/40 rounded-2xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-gray-400 text-sm">AKTUELLE GENERATION</p>
                        <p className="text-3xl font-bold text-cyan-300">#{latestGen.generation}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">AVG. SCORE</p>
                        <p className={`text-3xl font-bold ${latestGen.avg_score > 50 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {latestGen.avg_score.toFixed(1)}
                        </p>
                    </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${latestGen.avg_score > 50 ? 'bg-green-600' : 'bg-yellow-600'} rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.min(latestGen.avg_score, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {latestGen.prompts_generated} Prompts • {latestGen.sample_count} Samples
                </p>
            </div>

            {/* GENERATIONSVERLAUF */}
            <div>
                <h4 className="text-lg font-bold text-gray-300 mb-4">LETZTE ZYKLEN</h4>
                <div className="space-y-3">
                    {recentProgress.map((entry, index) => (
                        <div 
                            key={entry.generation}
                            className={`p-3 rounded-xl border ${index === 0 ? 'bg-cyan-900/20 border-cyan-700/50' : 'bg-gray-900/50 border-gray-800'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${entry.avg_score > 50 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span className="font-bold text-gray-300">GEN {entry.generation}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-cyan-400">{entry.avg_score.toFixed(1)}</p>
                                    <p className="text-xs text-gray-500">{entry.prompts_generated}P</p>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between text-xs text-gray-500">
                                <span>{new Date(entry.timestamp).toLocaleTimeString('de-DE')}</span>
                                <span>{entry.sample_count} Samples</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">TOTAL_GENERATIONS:</span> {data.generationen}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">EVOLUTION_ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
