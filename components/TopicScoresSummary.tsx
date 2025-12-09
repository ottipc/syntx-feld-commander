import * as React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/topics';

interface TopicStats {
    count: number;
    avg_score: number;
    perfect_count: number;
    min_score: number;
    max_score: number;
}

interface TopicScoresData {
    status: string;
    total_topics: number;
    topics: { [key: string]: TopicStats };
}

export const TopicScoresSummary: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TopicScoresData>(SYNTX_ENDPOINT);

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
                <h3 className="text-xl font-bold text-red-400 mb-4">🎯 SCORE ERROR</h3>
                <p className="text-gray-400">Score-Feld nicht verfügbar</p>
            </div>
        );
    }

    const sortedTopics = Object.entries(data.topics)
        .sort(([, statsA], [, statsB]) => statsB.avg_score - statsA.avg_score)
        .slice(0, 6); // Top 6 nach Score

    const bestTopic = sortedTopics[0];
    const worstTopic = sortedTopics[sortedTopics.length - 1];
    const avgOverall = Object.values(data.topics).reduce((sum, stats) => sum + stats.avg_score, 0) / data.total_topics;

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-2 border-red-700/30 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-glow-red transition-all duration-500 h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                        <span className="relative">
                            <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm"></span>
                            🎯
                        </span>
                        TOPIC SCORE QUALITÄT
                    </h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">FIELD_PERFORMANCE_MATRIX</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-red-900/30 text-red-400 border border-red-700/50">
                    <span className="font-bold">Ø {avgOverall.toFixed(1)}</span>
                </div>
            </div>

            {/* BEST/WORST HIGHLIGHT */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-green-900/20 to-gray-900/40 rounded-xl border border-green-700/50">
                    <p className="text-gray-400 text-sm mb-2">BESTES TOPIC</p>
                    <p className="text-xl font-bold text-green-300 truncate">{bestTopic ? bestTopic[0].toLowerCase() : 'N/A'}</p>
                    <p className="text-3xl font-black text-green-400 mt-2">{bestTopic ? bestTopic[1].avg_score.toFixed(1) : '0.0'}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${bestTopic ? Math.min(bestTopic[1].avg_score * 10, 100) : 0}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-red-900/20 to-gray-900/40 rounded-xl border border-red-700/50">
                    <p className="text-gray-400 text-sm mb-2">SCHLECHTESTES</p>
                    <p className="text-xl font-bold text-red-300 truncate">{worstTopic ? worstTopic[0].toLowerCase() : 'N/A'}</p>
                    <p className="text-3xl font-black text-red-400 mt-2">{worstTopic ? worstTopic[1].avg_score.toFixed(1) : '0.0'}</p>
                    <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${worstTopic ? Math.min(worstTopic[1].avg_score * 10, 100) : 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* TOPIC SCORE LISTE */}
            <div className="space-y-4 mb-8">
                {sortedTopics.map(([topic, stats]) => {
                    const scoreColor = stats.avg_score >= 8 ? 'text-green-400' : 
                                      stats.avg_score >= 6 ? 'text-yellow-400' : 
                                      'text-red-400';
                    const bgColor = stats.avg_score >= 8 ? 'bg-green-600' : 
                                    stats.avg_score >= 6 ? 'bg-yellow-600' : 
                                    'bg-red-600';
                    
                    return (
                        <div key={topic} className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${bgColor}`}></div>
                                    <span className="text-gray-300 text-sm capitalize">{topic.toLowerCase()}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-400 text-xs">{stats.count} Prompts</span>
                                    <span className={`text-xl font-bold ${scoreColor}`}>{stats.avg_score.toFixed(1)}</span>
                                </div>
                            </div>
                            
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${bgColor} transition-all duration-1000`}
                                    style={{ width: `${Math.min(stats.avg_score * 10, 100)}%` }}
                                >
                                    {/* Perfect Count Indicator */}
                                    {stats.perfect_count > 0 && (
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                            <div className="flex gap-1">
                                                {[...Array(Math.min(stats.perfect_count, 3))].map((_, i) => (
                                                    <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Min: {stats.min_score.toFixed(1)}</span>
                                <span>Max: {stats.max_score.toFixed(1)}</span>
                                {stats.perfect_count > 0 && (
                                    <span className="text-green-400">✨ {stats.perfect_count} perfekt</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* QUALITÄTS-STATUS */}
            <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-400 text-sm">FELD-QUALITÄT</p>
                    <p className={`text-lg font-bold ${avgOverall > 7 ? 'text-green-400' : avgOverall > 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {avgOverall > 7 ? 'HOCH' : avgOverall > 5 ? 'MODERAT' : 'KRITISCH'}
                    </p>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${avgOverall > 7 ? 'bg-green-600' : avgOverall > 5 ? 'bg-yellow-600' : 'bg-red-600'}`}
                        style={{ width: `${Math.min(avgOverall * 10, 100)}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Ø Score über {data.total_topics} Topics: {avgOverall.toFixed(2)}
                </p>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-mono">
                        <span className="text-red-400">PERFECT_RATE:</span> {Object.values(data.topics).reduce((sum, stats) => sum + stats.perfect_count, 0)} Prompts
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${avgOverall > 7 ? 'bg-green-500' : avgOverall > 5 ? 'bg-yellow-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}></div>
                        <span className="text-xs text-gray-400">QUALITY_MONITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
