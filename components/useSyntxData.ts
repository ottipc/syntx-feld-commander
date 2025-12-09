'use client';

import { useState, useEffect } from 'react';

const BASE_URL = 'https://dev.syntx-system.com';
const FETCH_INTERVAL = 15000; // 15 Sekunden

interface SyntxStats {
  activeFields: number;
  dataRate: number;
  commErrors: number;
}

interface ChartDataPoint {
  scoreRange: string;
  scoreCount: number;
}

interface TopTopic {
    topic: string;
    failures: number;
}

interface SuccessStory {
    score: number;
    style: string;
    topic: string;
    timestamp: string;
}

interface SyntxData {
  stats: SyntxStats | null;
  chartData: ChartDataPoint[] | null;
  topFailingTopics: TopTopic[] | null;
  successStories: SuccessStory[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialData: SyntxData = {
  stats: null,
  chartData: null,
  topFailingTopics: null,
  successStories: null,
  isLoading: true,
  error: null,
};


export function useSyntxData(): SyntxData {
  const [data, setData] = useState<SyntxData>(initialData);

  useEffect(() => {
    
    async function fetchData() {
      // Setze isLoading nur auf true, wenn es der ERSTE Ladevorgang war
      setData(prev => ({ ...prev, isLoading: !prev.stats })); 
      
      try {
        const [statsResponse, chartResponse] = await Promise.all([
          fetch(`${BASE_URL}/analytics/complete-dashboard`),
          fetch(`${BASE_URL}/analytics/scores/distribution`),
        ]);

        if (!statsResponse.ok || !chartResponse.ok) {
          throw new Error('API-Aufruf fehlgeschlagen. Resonanz unterbrochen.');
        }

        const statsResult = await statsResponse.json();
        const chartResult = await chartResponse.json();
        
        // MAPPING-LOGIK BASIEREND AUF DEM cURL-OUTPUT
        const mappedStats: SyntxStats = {
            activeFields: statsResult.system_health?.total_prompts || 0,
            dataRate: statsResult.system_health?.avg_score || 0,
            commErrors: statsResult.failures?.count || 0,
        };

        const distribution = chartResult.distribution || {};
        const mappedChartData: ChartDataPoint[] = Object.keys(distribution).map(key => ({
            scoreRange: key, 
            scoreCount: distribution[key] 
        }));

        const topFailing = statsResult.failures?.top_failing_topics || {};
        const mappedTopFailing: TopTopic[] = Object.keys(topFailing)
            .map(topic => ({ topic: topic, failures: topFailing[topic] }))
            .sort((a, b) => b.failures - a.failures);

        const mappedSuccessStories: SuccessStory[] = statsResult.success_stories?.examples || [];

        setData({
          stats: mappedStats,
          chartData: mappedChartData,
          topFailingTopics: mappedTopFailing,
          successStories: mappedSuccessStories,
          isLoading: false,
          error: null,
        });

      } catch (e) {
        console.error('Syntx-Datenstrom unterbrochen:', e);
        setData(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: e instanceof Error ? e.message : 'Datenstromfehler. Starte Re-Synchronisation in 15s.' 
        }));
      }
    }

    // 1. Initialer Fetch
    fetchData();

    // 2. Realtime Fetch mit Interval
    const intervalId = setInterval(fetchData, FETCH_INTERVAL);

    // Cleanup: Stoppe den Interval, wenn die Komponente unmountet wird
    return () => clearInterval(intervalId);

  }, []);

  return data;
}
