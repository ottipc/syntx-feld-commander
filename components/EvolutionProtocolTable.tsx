import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/generation/progress';
const EVOLUTION_DATA = [ // Daten aus
    { generation: 4, timestamp: "2025-12-09T10:03:56.012623", avg_score: 100, prompts_generated: 20 },
    { generation: 3, timestamp: "2025-12-09T06:03:18.267041", avg_score: 100, prompts_generated: 20 },
    { generation: 2, timestamp: "2025-12-09T04:02:28.579941", avg_score: 100, prompts_generated: 20 },
    { generation: 1, timestamp: "2025-12-09T02:03:08.522467", avg_score: 100, prompts_generated: 20 },
];

const formatTime = (ts: string) => new Date(ts).toLocaleTimeString('de-DE');

export const EvolutionProtocolTable: React.FC = () => {
    // ... data fetching

    return (
        <div className="p-4 bg-gray-900 border-2 border-cyan-700">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">EVOLUTIONSPROTOKOLL (GENERATIONEN)</h3>
            
            <table className="w-full text-left text-xs font-mono">
                <thead>
                    <tr className="border-b border-gray-700 text-gray-400">
                        <th className="py-2">Gen #</th>
                        <th className="py-2">Zeitpunkt</th>
                        <th className="py-2 text-right">Avg. Score</th>
                        <th className="py-2 text-right">Prompts</th>
                    </tr>
                </thead>
                <tbody>
                    {EVOLUTION_DATA.map((item) => (
                        <tr key={item.generation} className="border-b border-gray-800">
                            <td className="py-2 text-red-400">{item.generation}</td>
                            <td className="py-2 text-gray-300">{formatTime(item.timestamp)}</td>
                            <td className="py-2 text-right text-green-500">{item.avg_score}%</td>
                            <td className="py-2 text-right text-gray-400">{item.prompts_generated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
