import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/prompts/costs/total';

interface CostsData {
    total_cost_usd: number;
    avg_cost_per_prompt: number;
    total_prompts: number;
}

export const TotalCosts: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<CostsData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">💰 COST ERROR</h3>
                <p className="text-gray-400">Kosten-Daten nicht verfügbar</p>
            </div>
        );
    }

    const isExpensive = data.avg_cost_per_prompt > 0.01; // Über 1 Cent pro Prompt
    const totalColor = data.total_cost_usd > 1.0 ? 'text-yellow-400' : 'text-green-400';

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full">
            {/* HEADER mit Geld-Icon */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            💰
                        </span>
                        KOSTEN ANALYSE
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">API_COST_MONITOR</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-700/50">
                    <span className="font-bold">${data.total_cost_usd.toFixed(4)}</span>
                </div>
            </div>

            {/* GESAMTKOSTEN VISUAL */}
            <div className="mb-8 text-center p-5 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">GESAMTKOSTEN (USD)</p>
                <div className="flex justify-center items-baseline">
                    <span className="text-4xl text-gray-300">$</span>
                    <span className={`text-6xl font-black ${totalColor}`}>{data.total_cost_usd.toFixed(4)}</span>
                </div>
                
                {/* Geldfluss-Balken */}
                <div className="mt-4 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${totalColor.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(data.total_cost_usd * 100, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Kostenwachstum</p>
            </div>

            {/* ZWEI-SPALTEN METRIKEN */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-700/50 transition-colors">
                    <p className="text-gray-400 text-sm mb-2">AVG. KOSTEN PROMPT</p>
                    <div className="flex items-baseline">
                        <span className="text-xl text-gray-300">$</span>
                        <span className={`text-3xl font-bold ${isExpensive ? 'text-red-400' : 'text-green-400'}`}>
                            {data.avg_cost_per_prompt.toFixed(4)}
                        </span>
                    </div>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${isExpensive ? 'bg-red-600' : 'bg-green-600'}`}
                            style={{ width: `${Math.min(data.avg_cost_per_prompt * 10000, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-green-700/50 transition-colors">
                    <p className="text-gray-400 text-sm mb-2">PROMPTS GESAMT</p>
                    <p className="text-3xl font-bold text-cyan-400">{data.total_prompts}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-cyan-600 rounded-full"
                            style={{ width: `${Math.min(data.total_prompts / 10, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* KOSTEN-EFFIZIENZ */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">KOSTEN-EFFIZIENZ</p>
                    <p className={`text-lg font-bold ${data.avg_cost_per_prompt < 0.005 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {data.avg_cost_per_prompt < 0.005 ? 'HOCH' : 'MODERAT'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${data.avg_cost_per_prompt < 0.005 ? 'bg-green-600' : 'bg-yellow-600'}`}
                        style={{ width: `${Math.max(100 - (data.avg_cost_per_prompt * 100000), 30)}%` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-correct"></div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {data.avg_cost_per_prompt < 0.005 ? 'Sehr effizient' : 'Kostenbewusst'}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-yellow-400">COST_PER_TOKEN:</span> ${(data.avg_cost_per_prompt / 1000).toFixed(6)}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${data.total_cost_usd > 1.0 ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="text-xs text-gray-400">COST_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
