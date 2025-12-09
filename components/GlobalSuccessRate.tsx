import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/success-rate';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface SuccessRateData {
    success_rate: number; // Wert ist 0 in den echten Daten
    verteilung: {
        perfekt_100: { prozent: number };
        gut_80_99: { prozent: number };
        niedrig_0_49: { prozent: number };
    };
}

export const GlobalSuccessRate: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<SuccessRateData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade globale Erfolgsrate...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Erfolgsrate.</div>;
    }

    const lowRate = data.verteilung.niedrig_0_49.prozent;
    // Wir nehmen an, dass 'gut_80_99' ebenfalls zur Success Rate gezählt wird.
    const perfectRate = (data.verteilung.perfekt_100.prozent || 0) + (data.verteilung.gut_80_99?.prozent || 0);
    const color = perfectRate > 5 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">GLOBAL SUCCESS RATE</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    {/* HIER WURDE >= DURCH &gt;= ERSETZT */}
                    <span className="text-gray-400">PERFEKTE / GUTE SCORES (&gt;= 80)</span>
                    <span className={`font-bold ${color}`}>{perfectRate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">KRITISCHE SCORES (0-49)</span>
                    <span className="font-bold text-red-500">{lowRate.toFixed(2)}%</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
