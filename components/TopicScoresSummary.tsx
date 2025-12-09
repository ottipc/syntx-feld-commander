import React from 'react';
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
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Topic Score Übersicht...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Topic Scores.</div>;
    }

    const sortedTopics = Object.entries(data.topics)
        .sort(([, statsA], [, statsB]) => statsB.avg_score - statsA.avg_score);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">TOPIC SCORE ÜBERSICHT ({data.total_topics} Topics)</h3>
            
            <div className="text-sm">
                <div className="flex justify-between font-bold text-gray-500 border-b border-gray-700 pb-1 mb-1">
                    <span>Topic</span>
                    <span>Avg. Score</span>
                    <span>Count</span>
                </div>
                {sortedTopics.map(([topic, stats]) => (
                    <div key={topic} className="flex justify-between py-1 border-b border-gray-800 last:border-b-0">
                        <span className="text-gray-300 capitalize">{topic}</span>
                        <span className={`font-bold ${stats.avg_score > 50 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {stats.avg_score.toFixed(2)}
                        </span>
                        <span className="text-gray-500">{stats.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
