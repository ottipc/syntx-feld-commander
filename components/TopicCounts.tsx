import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/feld/topics';

interface TopicCountsData {
    status: string;
    topic_counts: { [key: string]: number };
}

export const TopicCounts: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TopicCountsData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Topic Counts...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Topic Counts.</div>;
    }

    const sortedTopics = Object.entries(data.topic_counts)
        .sort(([, countA], [, countB]) => countB - countA);
    const totalCount = sortedTopics.reduce((sum, [, count]) => sum + count, 0);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">TOPIC VERTEILUNG ({totalCount} Gesamt)</h3>
            
            <div className="text-sm space-y-1">
                {sortedTopics.map(([topic, count]) => {
                    const percentage = (count / totalCount) * 100;
                    return (
                        <div key={topic} className="flex justify-between items-center">
                            <span className="text-gray-400 capitalize">{topic}</span>
                            <div className="flex items-center space-x-2 w-3/4">
                                <div className="h-2 flex-grow bg-gray-800 rounded-full">
                                    <div 
                                        className="h-2 bg-cyan-600 rounded-full" 
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-cyan-400 font-bold w-10 text-right">{count}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
