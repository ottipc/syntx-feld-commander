'use client';

import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { useSyntxData } from './useSyntxData'; 

export function DataStreamChart() {
  const { chartData } = useSyntxData(); 

  if (!chartData) return null; 

  // Formatiert die Y-Achse
  const dataFormatter = (number: number) =>
    Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(number) + ' Einträge';

  return (
    <Card className="mt-8 bg-syntx-dark border-syntx-neon border-opacity-20 shadow-syntx-glow">
      <Title className="text-syntx-neon font-mono">Score-Verteilung (Prompts)</Title>
      <Subtitle className="text-gray-500 font-mono">
        Anzahl der Prompts pro erreichter Score-Bandbreite (0-100).
      </Subtitle>
      <BarChart
        className="mt-6"
        data={chartData}
        index="scoreRange"             
        categories={['scoreCount']}     
        colors={['teal']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}
