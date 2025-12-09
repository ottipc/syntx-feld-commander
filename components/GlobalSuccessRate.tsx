import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/success-rate';

interface SuccessRateData {
    success_rate: number;
    verteilung: {
        perfekt_100: { prozent: number };
        gut_80_99: { prozent: number };
        niedrig_0_49: { prozent: number };
    };
}

export const GlobalSuccessRate: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<SuccessRateData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">🎯 SUCCESS ERROR</h3>
                <p className="text-gray-400">Erfolgsrate nicht verfügbar</p>
            </div>
        );
    }

    const perfectRate = data.verteilung.perfekt_100.prozent;
    const goodRate = data.verteilung.gut_80_99?.prozent || 0;
    const lowRate = data.verteilung.niedrig_0_49.prozent;
    
    const totalGoodRate = perfectRate + goodRate;
    const isHealthy = totalGoodRate > 20;
    const perfectColor = perfectRate > 5 ? 'text-green-400' : 'text-yellow-400';

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            🎯
                        </span>
                        GLOBAL SUCCESS RATE
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_SUCCESS_METRIC</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${isHealthy ? 'bg-green-900/30 text-green-400 border-green-700/50' : 'bg-red-900/30 text-red-400 border-red-700/50'}`}>
                    <span className="font-bold">{totalGoodRate.toFixed(1)}%</span>
                </div>
            </div>

            {/* ERFOLGSRATE VISUAL */}
            <div className="mb-8 text-center p-5 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">ERFOLGSRATE (&gt;= 80)</p>
                <p className="text-6xl font-black text-green-400">{totalGoodRate.toFixed(1)}%</p>
                <div className="mt-4 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-green-600 to-cyan-600 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(totalGoodRate, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {isHealthy ? 'Gesundes Erfolgsniveau' : 'Kritische Erfolgsrate'}
                </p>
            </div>

            {/* VERTEILUNG DREI-SPALTEN */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-green-900/20 to-gray-900/40 rounded-xl border border-green-700/50">
                    <p className="text-gray-400 text-xs mb-1">PERFEKT (100)</p>
                    <p className={`text-2xl font-bold ${perfectColor}`}>{perfectRate.toFixed(1)}%</p>
                    <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${Math.min(perfectRate * 5, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-cyan-900/20 to-gray-900/40 rounded-xl border border-cyan-700/50">
                    <p className="text-gray-400 text-xs mb-1">GUT (80-99)</p>
                    <p className="text-2xl font-bold text-cyan-400">{goodRate.toFixed(1)}%</p>
                    <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-cyan-600 rounded-full"
                            style={{ width: `${Math.min(goodRate * 5, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-red-900/20 to-gray-900/40 rounded-xl border border-red-700/50">
                    <p className="text-gray-400 text-xs mb-1">KRITISCH (0-49)</p>
                    <p className="text-2xl font-bold text-red-400">{lowRate.toFixed(1)}%</p>
                    <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${Math.min(lowRate * 5, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* ERFOLGS-STATUS */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">FELD-ERFOLGSSTATUS</p>
                    <p className={`text-lg font-bold ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
                        {isHealthy ? 'OPTIMAL' : 'KRITISCH'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${isHealthy ? 'bg-green-600' : 'bg-red-600'}`}
                        style={{ width: `${Math.min(totalGoodRate, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {isHealthy ? `${perfectRate.toFixed(1)}% perfekte Scores` : `${lowRate.toFixed(1)}% kritische Scores`}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-green-400">SUCCESS_SCORE:</span> {data.success_rate.toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500 animate-pulse-slow' : 'bg-red-500 animate-pulse'}`}></div>
                        <span className="text-xs text-gray-400">SUCCESS_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
