'use client';

import { Title, Text, Card, Flex, ProgressBar } from "@tremor/react";
import { motion } from 'framer-motion';
import { SyntxStats } from './SyntxStats';
import { DataStreamChart } from './DataStreamChart';
import { TopFailingTopics } from './TopFailingTopics'; 
import { SuccessStories } from './SuccessStories'; 
import { useSyntxData } from './useSyntxData'; 

export function DashboardContainer() {
  const { isLoading, error } = useSyntxData(); 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-16" 
    >
      <Title className="text-syntx-neon text-3xl font-mono tracking-widest">
        SYNTX FELD-COMMANDER
      </Title>
      <Text className="text-gray-500 mt-2 font-mono">
        Echtzeit-Analyse der verbundenen SYNTX-Feldkanäle.
      </Text>

      {/* Ladezustand / Fehlerbehandlung */}
      {isLoading && (
        <Card className="mt-8 bg-syntx-dark border-syntx-neon border-opacity-20 shadow-syntx-glow">
          <Text className="text-syntx-neon font-mono">KANALSYNCHRONISIERUNG LÄUFT...</Text>
          <ProgressBar value={60} className="mt-2" color="teal" />
        </Card>
      )}

      {error && (
        <Card className="mt-8 bg-syntx-dark border-red-500 border-opacity-40 shadow-xl">
            <Title className="text-red-500 font-mono">KRITISCHER DATENFEHLER</Title>
            <Text className="text-gray-400 mt-2">Fehler: {error}</Text>
        </Card>
      )}

      {!isLoading && (
        <>
          {/* Reihe 1: Kern-Metriken */}
          <SyntxStats />

          {/* Reihe 2: Score-Verteilung (großes Chart) */}
          <DataStreamChart />

          {/* Reihe 3: Detail-Listen (nebeneinander auf Lg-Bildschirmen) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopFailingTopics />
            <SuccessStories />
          </div>

        </>
      )}
    </motion.div>
  );
}
