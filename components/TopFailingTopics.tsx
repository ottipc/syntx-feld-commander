import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/feld/failure-topics';
const FAILING_TOPICS = [ // Daten aus
    { topic: 'HARMLOS', failures: 64, color: '#f87171' }, 
    { topic: 'BILDUNG', failures: 56, color: '#fbbf24' },
    { topic: 'GESELLSCHAFT', failures: 47, color: '#facc15' },
    { topic: 'TECHNOLOGIE', failures: 34, color: '#60a5fa' },
    { topic: 'KONTROVERS', failures: 30, color: '#a78bfa' },
];

export const TopFailingTopics: React.FC = () => {
    // ... data fetching

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">FELD-VERLUST ANALYSE (TOP 5 RISIKEN)</h3>
            
            <table className="w-full text-left text-sm font-mono">
                <thead>
                    <tr className="border-b border-red-700 text-red-400">
                        <th className="py-2">#</th>
                        <th className="py-2">Thema</th>
                        <th className="py-2 text-right">Fehler</th>
                    </tr>
                </thead>
                <tbody>
                    {FAILING_TOPICS.map((item, index) => (
                        <tr key={item.topic} className="border-b border-gray-800">
                            <td className="py-2 text-red-500 font-bold">#{index + 1}</td>
                            <td className="py-2 text-gray-300">{item.topic}</td>
                            <td className="py-2 text-right text-red-400">{item.failures} Fehler</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
