import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/topics';

// Typisierung basierend auf der tatsächlichen API-Antwort
interface TopicDetail {
    count: number;
    avg_score: number;
    perfect_count: number;
}

interface TopicsData {
    topics: { [key: string]: TopicDetail };
}

// Konvertiert das Topics-Objekt in ein Array und sortiert nach avg_score (absteigend)
const mapTopicsToChart = (topics: { [key: string]: TopicDetail }): { topic: string, score: number, count: number }[] => {
    return Object.entries(topics)
        .map(([topic, detail]) => ({
            topic: topic.toUpperCase(),
            score: detail.avg_score,
            count: detail.count,
            color: detail.avg_score < 5 ? 'text-red-500' : detail.avg_score < 7 ? 'text-yellow-500' : 'text-green-500'
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // Zeigt nur die Top 5 Themen
};

export const TopicScores: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<TopicsData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Topic-Analytik...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Topic-Daten.</div>;
    }

    const chartData = mapTopicsToChart(data.topics);

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">TOPIC SCORES (AVG)</h3>
            
            <div className="space-y-3">
                {chartData.map(item => (
                    <div key={item.topic} className="flex justify-between text-sm">
                        <span className="text-gray-400 w-1/3">{item.topic}</span>
                        <div className="flex-1 h-2 bg-gray-700 rounded mr-2 mt-1">
                            {/* Skaliert den Balken zur maximalen Punktzahl (z.B. 100, hier nur zur Visualisierung) */}
                            <div 
                                className={`h-2 rounded ${item.color.replace('text-', 'bg-')}`}
                                style={{ width: `${(item.score / 10) * 100}%` }}
                            />
                        </div>
                        <span className={`font-bold ${item.color} w-1/4 text-right`}>
                            {item.score.toFixed(2)} ({item.count})
                        </span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">URL: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
