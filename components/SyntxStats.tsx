'use client';

import { Card, Metric, Text, Flex, BadgeDelta, Grid } from "@tremor/react";
import { useSyntxData } from './useSyntxData'; // Hook import

export function SyntxStats() {
  const { stats } = useSyntxData(); // Daten abrufen

  if (!stats) return null; // Sollte durch DashboardContainer abgefangen werden, dient aber als Fallback

  const metrics = [
    {
      title: "Felder Aktiv",
      metric: stats.activeFields.toLocaleString('de-DE'),
      delta: {
        indicator: "increase",
        text: "Geringfügige Steigerung",
      },
    },
    {
      title: "Datenrate (MB/s)",
      metric: stats.dataRate.toFixed(2),
      delta: {
        indicator: "moderateDecrease",
        text: "Optimierungsziel erreicht",
      },
    },
    {
      title: "Komm. Fehler",
      metric: stats.commErrors.toLocaleString('de-DE'),
      delta: {
        indicator: stats.commErrors > 0 ? "moderateDecrease" : "unchanged",
        text: stats.commErrors > 0 ? "Erkannt und Korrigiert" : "Optimal",
      },
    },
  ];

  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-8">
      {metrics.map((item, index) => (
        <Card 
          key={index} 
          className="bg-syntx-dark border-syntx-neon border-opacity-20 shadow-syntx-glow"
        >
          <Flex alignItems="start">
            <Text className="text-gray-400">{item.title}</Text>
            <BadgeDelta deltaType={item.delta.indicator} className="font-mono">
              {item.delta.text}
            </BadgeDelta>
          </Flex>
          <Metric className="text-syntx-neon mt-2 font-mono">{item.metric}</Metric>
        </Card>
      ))}
    </Grid>
  );
}
