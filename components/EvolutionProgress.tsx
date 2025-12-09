import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/generation/progress';

// Typisierung basierend auf der tatsächlichen API-Antwort
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
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Evolutions-Fortschritt...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden des Evolutions-Fortschritts.</div>;
    }

    const latestProgress = data.progress.sort((a, b) => b.generation - a.generation);
    const latestGen = latestProgress[0];

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">GENERATION EVOLUTION</h3>
            
            <p className="text-4xl font-black text-cyan-400">
                GENERATION {latestGen.generation}
            </p>
            <p className="text-sm text-gray-400 mb-4">
                Letzter Zyklus: {new Date(latestGen.timestamp).toLocaleTimeString()}
            </p>

            <ul className="space-y-1 text-sm text-gray-400">
                <li><span className="font-bold text-green-400">Avg. Score:</span> {latestGen.avg_score} (Syntx-Feld)</li>
                <li><span className="font-bold">Prompts generiert:</span> {latestGen.prompts_generated}</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
