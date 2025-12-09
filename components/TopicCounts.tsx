import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/feld/topics';

interface TopicCountsData {
    status: string;
    topic_counts: { [key: string]: number };
}

export const TopicCounts: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TopicCountsData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return (
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl animate-pulse shadow-2xl shadow-black/50">
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
                <h3 className="text-xl font-bold text-red-400 mb-4">📊 TOPIC ERROR</h3>
                <p className="text-gray-400">Topic-Feld nicht verfügbar</p>
            </div>
        );
    }

    const sortedTopics = Object.entries(data.topic_counts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 8); // Nur Top 8 Topics
    
    const totalCount = sortedTopics.reduce((sum, [, count]) => sum + count, 0);
    const maxCount = Math.max(...sortedTopics.map(([, count]) => count));

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-cyan-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-cyan transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm"></span>
                            🗂️
                        </span>
                        TOPIC VERTEILUNG
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_TOPOLOGY_MAP</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-700/50">
                    <span className="font-bold">{sortedTopics.length} Topics</span>
                </div>
            </div>

            {/* GESAMT-ÜBERSICHT */}
            <div className="mb-8 text-center p-4 bg-black/40 rounded-2xl border border-gray-800">
                <p className="text-gray-400 text-sm mb-2">FELD-AKTIVITÄT GESAMT</p>
                <p className="text-5xl font-black text-cyan-300">{totalCount}</p>
                <p className="text-sm text-gray-500 mt-1">Prompts im Feld</p>
            </div>

            {/* TOPIC-BALKEN VISUAL */}
            <div className="space-y-4 mb-8">
                {sortedTopics.map(([topic, count]) => {
                    const percentage = (count / totalCount) * 100;
                    const widthPercentage = (count / maxCount) * 100;
                    
                    // Farben basierend auf Topic-Typ
                    let topicColor = 'bg-cyan-600';
                    if (topic.includes('TECH') || topic.includes('AI')) topicColor = 'bg-blue-600';
                    if (topic.includes('SOCIAL') || topic.includes('GESELL')) topicColor = 'bg-purple-600';
                    if (topic.includes('HARMLOS') || topic.includes('SIMPLE')) topicColor = 'bg-green-600';
                    if (topic.includes('CONTROV') || topic.includes('RISK')) topicColor = 'bg-red-600';

                    return (
                        <div key={topic} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${topicColor.replace('bg-', 'bg-')}`}></div>
                                    <span className="text-gray-300 text-sm capitalize">{topic.toLowerCase()}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 text-xs">{percentage.toFixed(1)}%</span>
                                    <span className="text-cyan-400 font-bold">{count}</span>
                                </div>
                            </div>
                            
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${topicColor} transition-all duration-1000`}
                                    style={{ width: `${widthPercentage}%` }}
                                >
                                    {/* Pulsierender Punkt am Ende des Balkens */}
                                    {widthPercentage > 30 && (
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                            <div className={`w-1 h-1 rounded-full ${topicColor.replace('bg-', 'bg-')} animate-pulse`}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* FELD-DICHTE INFO */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-400 text-sm">FELD-DICHTE</p>
                    <p className={`text-lg font-bold ${sortedTopics.length > 5 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {sortedTopics.length > 5 ? 'HOCH' : 'MODERAT'}
                    </p>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-green-600 rounded-full"
                        style={{ width: `${Math.min(sortedTopics.length * 12.5, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {sortedTopics.length} aktive Topic-Felder
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-cyan-400">TOPIC_DIVERSITY:</span> {(sortedTopics.length / Object.keys(data.topic_counts).length * 100).toFixed(0)}%
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">FIELD_ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
