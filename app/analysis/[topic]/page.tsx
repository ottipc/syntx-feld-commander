'use client';

import { notFound } from 'next/navigation';
import { Title, Text, Card, Flex, Badge, Metric } from '@tremor/react';
import Link from 'next/link';
import { IoArrowBackCircleOutline, IoAlertCircleOutline, IoCubeOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://dev.syntx-system.com';

interface PromptRow {
  id: string;
  timestamp: string;
  topic: string;
  style: string;
  score: number;
}

const CRITICAL_SCORE_THRESHOLD = 20;

export default function TopicAnalysisPage({ params }: { params: { topic: string } }) {
  const [data, setData] = useState<PromptRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stelle sicher, dass das Topic korrekt decodiert und kleingeschrieben wird, um mit den API-Daten abzugleichen
  const topicKey = decodeURIComponent(params.topic).toLowerCase();
  const displayTopic = topicKey.toUpperCase();

  const decodePromptTextPlaceholder = (id: string) => {
    return `Prompt-Kennung: ${id.substring(0, 15)}...`;
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/prompts/table-view`);
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Prompt-Tabelle.');
        }
        
        const result = await response.json();
        
        if (!result.table || !Array.isArray(result.table)) {
            throw new Error('Ungültige Datenstruktur vom API-Endpunkt.');
        }

        const filteredData = result.table.filter((row: PromptRow) => 
            row.topic === topicKey && row.score <= CRITICAL_SCORE_THRESHOLD
        );

        setData(filteredData);
        
      } catch (e) {
        console.error('Analyse-Datenstrom unterbrochen:', e);
        setError(e instanceof Error ? e.message : 'Unbekannter Datenfehler');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();

    // Re-Fetch Logic
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);

  }, [topicKey]);


  return (
    <div className="pb-16">
      <Link href="/" className="flex items-center text-syntx-neon hover:text-syntx-lightneon transition duration-200 mb-6 font-mono">
        <IoArrowBackCircleOutline className="w-6 h-6 mr-2" />
        ZURÜCK ZUM FELD-COMMANDER
      </Link>
      
      <Title className="text-red-400 text-3xl font-mono tracking-widest mt-4">
        KRITISCHE FELD-ANALYSE: {displayTopic}
      </Title>
      <Text className="text-gray-500 mt-2 font-mono">
        Live-Übersicht der Prompts mit Score $\le {CRITICAL_SCORE_THRESHOLD}\%$.
      </Text>

      {/* Ladezustand / Fehlerbehandlung */}
      {isLoading && (
        <Card className="mt-8 bg-syntx-dark border-syntx-neon border-opacity-20 shadow-syntx-glow">
          <Text className="text-syntx-neon font-mono">LADE KRITISCHE PROMPTS...</Text>
        </Card>
      )}

      {error && (
        <Card className="mt-8 bg-syntx-dark border-red-500 border-opacity-40 shadow-xl">
            <Title className="text-red-500 font-mono">DATENSTROM-FEHLER</Title>
            <Text className="text-gray-400 mt-2">Fehler: {error}</Text>
        </Card>
      )}

      {!isLoading && data.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6">
          {data.map((prompt) => (
            <Card key={prompt.id} className="bg-syntx-dark border-red-500 border-opacity-30 shadow-syntx-glow">
              <Flex justifyContent="between" alignItems="start">
                <div>
                  <Title className="text-red-400 font-mono flex items-center">
                    <IoAlertCircleOutline className="mr-2 w-5 h-5" />
                    KRITISCHER PROMPT ({prompt.topic.toUpperCase()})
                  </Title>
                  <Text className="text-gray-400 mt-1 font-mono">{decodePromptTextPlaceholder(prompt.id)}</Text>
                </div>
                <Metric className="text-red-500">
                    {prompt.score}%
                </Metric>
              </Flex>
              
              <Flex justifyContent="start" className="mt-4 space-x-4">
                <Badge color="cyan" icon={IoCubeOutline} className="font-mono">
                  {prompt.style.toUpperCase()}
                </Badge>
                <Text className="text-gray-500 font-mono">
                    Zeitstempel: {new Date(prompt.timestamp).toLocaleTimeString('de-DE')}
                </Text>
              </Flex>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && data.length === 0 && !error && (
        <Card className="mt-8 bg-syntx-dark border-green-400 border-opacity-30 shadow-syntx-glow">
          <Title className="text-green-400 font-mono">KEINE KRITISCHEN VERLUSTE.</Title>
          <Text className="text-gray-400 mt-2 font-mono">Alle Prompts im angezeigten Datenstrom liegen über {CRITICAL_SCORE_THRESHOLD}%.</Text>
        </Card>
      )}

    </div>
  );
}
