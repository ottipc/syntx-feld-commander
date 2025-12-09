import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/performance';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface PerformanceData {
    gesamt: {
        avg_duration_ms: number;
        max_ms: number;
    };
}

// Hilfsfunktion zur Formatierung von Millisekunden in lesbare Sekunden (mit 2 Dezimalstellen)
const formatMsToSeconds = (ms: number): string => (ms / 1000).toFixed(2);

export const PerformanceStats: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<PerformanceData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Performance-Statistiken...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Performance-Daten.</div>;
    }

    const avgSeconds = formatMsToSeconds(data.gesamt.avg_duration_ms);
    const maxSeconds = formatMsToSeconds(data.gesamt.max_ms);
    const maxColor = data.gesamt.max_ms > 100000 ? 'text-red-500' : 'text-yellow-400'; // > 100s ist kritisch

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">PERFORMANCE & LATENZ</h3>
            
            <div className="text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">DURCHSCHN. DAUER</span>
                    <span className="font-bold text-cyan-400">{avgSeconds} s</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">MAXIMALE DAUER (Latenz-Spitze)</span>
                    <span className={`font-bold ${maxColor}`}>{maxSeconds} s</span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
