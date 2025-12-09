import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/feld/drift';

interface DriftKorper {
    id: string;
    topic: string;
    wrapper: string;
    kalibrierung_score: number;
}

interface DriftData {
    count: number;
    drift_korper: DriftKorper[];
}

export const DriftList: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<DriftData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">🌀 DRIFT ERROR</h3>
                <p className="text-gray-400">Drift-Feld nicht verfügbar</p>
            </div>
        );
    }

    const driftCount = data.count;
    const itemsToShow = data.drift_korper.slice(0, 5);
    const hasDrift = driftCount > 0;
    const criticalDrifts = itemsToShow.filter(d => d.kalibrierung_score === 0).length;

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            🌀
                        </span>
                        FELD DRIFT KÖRPER
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_COHERENCE_THREATS</p>
                </div>
                <div className={`px-4 py-2 rounded-full border ${hasDrift ? 'bg-red-900/30 text-red-400 border-red-700/50 animate-pulse' : 'bg-green-900/30 text-green-400 border-green-700/50'}`}>
                    <span className="font-bold">{driftCount}</span>
                </div>
            </div>

            {/* DRIFT-STATUS */}
            <div className="mb-8 text-center p-5 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">AKTIVE DRIFT-BEDROHUNGEN</p>
                <p className="text-5xl font-black text-red-400">{driftCount}</p>
                <div className="mt-4 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-red-600 to-yellow-600 rounded-full"
                        style={{ width: `${Math.min(driftCount * 5, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {criticalDrifts > 0 ? `${criticalDrifts} kritische Drifts` : 'Keine kritischen Drifts'}
                </p>
            </div>

            {/* DRIFT-LISTE */}
            <div className="space-y-4 mb-8">
                {hasDrift ? (
                    itemsToShow.map((item, index) => {
                        const isCritical = item.kalibrierung_score === 0;
                        const color = isCritical ? 'bg-red-600' : 'bg-yellow-600';
                        const textColor = isCritical ? 'text-red-400' : 'text-yellow-400';
                        
                        return (
                            <div 
                                key={item.id} 
                                className={`p-4 rounded-xl border ${isCritical ? 'bg-red-900/20 border-red-700/50' : 'bg-gray-900/50 border-gray-800'} hover:scale-[1.02] transition-all duration-300`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${color} animate-pulse`}></div>
                                        <span className="text-gray-300 text-sm font-bold capitalize">{item.topic}</span>
                                    </div>
                                    <span className={`text-lg font-bold ${textColor}`}>
                                        {item.kalibrierung_score}%
                                    </span>
                                </div>
                                
                                <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
                                    <div 
                                        className={`h-full rounded-full ${color}`}
                                        style={{ width: `${Math.max(item.kalibrierung_score, 5)}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span className="font-mono truncate">...{item.id.slice(-8)}</span>
                                    <span className="text-gray-400 capitalize">{item.wrapper}</span>
                                </div>
                                
                                {isCritical && (
                                    <div className="mt-2 flex items-center gap-1">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                        <span className="text-xs text-red-400">KRITISCH: Feld-Kohärenz verloren</span>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="p-8 text-center bg-gradient-to-br from-green-900/20 to-gray-900/40 rounded-2xl border border-green-700/50">
                        <div className="text-4xl mb-4">✅</div>
                        <h4 className="text-xl font-bold text-green-400 mb-2">KEINE DRIFTS</h4>
                        <p className="text-gray-400">Feld-Kohärenz ist stabil</p>
                    </div>
                )}
            </div>

            {/* DRIFT-ANALYSE */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">FELD-STABILITÄT</p>
                    <p className={`text-lg font-bold ${hasDrift ? 'text-red-400' : 'text-green-400'}`}>
                        {hasDrift ? 'GEFÄHRDET' : 'STABIL'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${hasDrift ? 'bg-red-600' : 'bg-green-600'}`}
                        style={{ width: `${hasDrift ? Math.min(driftCount * 20, 100) : 100}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {hasDrift ? `${driftCount} Drift-Körper im Feld` : 'Optimale Feld-Kohärenz'}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-red-400">DRIFT_RISK:</span> {hasDrift ? 'HIGH' : 'LOW'}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasDrift ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="text-xs text-gray-400">COHERENCE_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
