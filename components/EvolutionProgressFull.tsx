import React from 'react';
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
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Evolution Progress Details...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden des Evolutionsfortschritts.</div>;
    }

    // Zeige nur die letzten 5 Generationen
    const recentProgress = data.progress.slice(-5).reverse();

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">EVOLUTION PROGRESS DETAILS (Total Gen.: {data.generationen})</h3>
            
            <table className="min-w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-gray-800">
                    <tr>
                        <th scope="col" className="px-2 py-2">Gen.</th>
                        <th scope="col" className="px-2 py-2">Avg. Score</th>
                        <th scope="col" className="px-2 py-2">Samples</th>
                        <th scope="col" className="px-2 py-2">Prompts</th>
                        <th scope="col" className="px-2 py-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProgress.map((entry) => (
                        <tr key={entry.generation} className="bg-gray-900 border-b border-gray-800">
                            <td className="px-2 py-2 font-bold text-red-300">{entry.generation}</td>
                            <td className="px-2 py-2 text-cyan-400">{entry.avg_score.toFixed(2)}</td>
                            <td className="px-2 py-2">{entry.sample_count}</td>
                            <td className="px-2 py-2">{entry.prompts_generated}</td>
                            <td className="px-2 py-2 text-xs">{new Date(entry.timestamp).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-4">Zeigt die letzten 5 Generationen.</p>
        </div>
    );
};
