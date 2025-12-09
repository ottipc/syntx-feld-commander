"use client";

import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/topics';

interface TopicScoreItem {
    topic: string;
    score: number;
    count: number;
}

interface TopicScoresData {
    status: string;
    topics: TopicScoreItem[];
}

// Hilfsfunktion zur dynamischen Farbzuweisung basierend auf dem Score (0-10)
const getScoreColor = (score: number): string => {
    if (score >= 8.5) return 'bg-green-600';
    if (score >= 6.0) return 'bg-yellow-500';
    return 'bg-red-600';
};

export const TopicScoresSummary: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TopicScoresData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Topic Scores...</div>;
    }
    
    if (isError || !data || !data.topics) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Topic Scores.</div>;
    }

    const sortedTopics = data.topics.sort((a, b) => b.score - a.score);

    return (
        <div className="p-4 bg-gray-900 border-2 border-cyan-700 h-full">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-cyan-800 pb-2">TOPIC SCORE ÜBERSICHT (Ø Qualität)</h3>
            
            <div className="space-y-4">
                {sortedTopics.map((item, index) => {
                    const barColor = getScoreColor(item.score);
                    
                    return (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-gray-400 font-semibold">{item.topic} ({item.count})</span>
                                <span className={`font-bold ${barColor.replace('bg-', 'text-')}`}>
                                    {item.score.toFixed(2)}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                {/* Skaliert den Balken zur maximalen Punktzahl (10) */}
                                <div 
                                    className={`h-full rounded ${barColor}`}
                                    style={{ width: `${(item.score / 10) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
