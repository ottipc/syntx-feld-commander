import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/prompts/table-view';

interface TableEntry {
    id: string;
    timestamp: string;
    topic: string;
    score: number;
    duration_ms: number;
    wrapper: string;
}

interface TableViewData {
    status: string;
    total_rows: number;
    table: TableEntry[];
}

export const PromptsTablePlaceholder: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TableViewData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Prompt Table View...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Prompt Tabelle.</div>;
    }

    const latestPrompts = data.table.slice(0, 3); // Nur die ersten 3

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700 col-span-full">
            <h3 className="text-lg font-bold text-red-400 mb-4">PROMPT DATEN (Total Rows: {data.total_rows})</h3>
            
            <div className="text-xs text-gray-400 space-y-2">
                {latestPrompts.map((prompt, index) => (
                    <div key={index} className="flex justify-between border-b border-gray-800 pb-1">
                        <span className="w-1/4 truncate text-gray-500">{prompt.id}</span>
                        <span className="w-1/6 text-red-300 capitalize">{prompt.topic}</span>
                        <span className="w-1/12 font-bold text-cyan-400">{prompt.score}</span>
                        <span className="w-1/6 text-green-400">{(prompt.duration_ms / 1000).toFixed(1)} s</span>
                        <span className="w-1/6 text-yellow-400">{prompt.wrapper}</span>
                    </div>
                ))}
                <p className="text-center text-xs text-gray-600 pt-2">... {data.total_rows - 3} weitere Einträge ausgeblendet.</p>
            </div>
        </div>
    );
};
