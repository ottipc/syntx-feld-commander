import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/feld/drift';

// Typisierung basierend auf der tatsächlichen API-Antwort
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
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Drift-Körper...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Drift-Daten.</div>;
    }

    const driftCount = data.count;
    const itemsToShow = data.drift_korper.slice(0, 3);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">FELD DRIFT KÖRPER ({driftCount})</h3>
            
            {driftCount > 0 ? (
                <div className="space-y-3">
                    {itemsToShow.map((item, index) => (
                        <div key={item.id} className="text-sm p-2 bg-gray-800 border-l-4 border-yellow-500">
                            <p className="font-bold text-yellow-400">TOPIC: {item.topic.toUpperCase()}</p>
                            <p className="text-xs text-gray-400">WRAPPER: {item.wrapper.toUpperCase()} | SCORE: {item.kalibrierung_score}</p>
                            <p className="text-xs text-gray-500 truncate">ID: {item.id}</p>
                        </div>
                    ))}
                    {driftCount > itemsToShow.length && (
                         <p className="text-xs text-gray-500 mt-2 text-center">... und {driftCount - itemsToShow.length} weitere im Drift-Feld.</p>
                    )}
                </div>
            ) : (
                <p className="text-green-500 text-lg">Keine Drift-Körper gefunden. Feld ist stabil.</p>
            )}
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
