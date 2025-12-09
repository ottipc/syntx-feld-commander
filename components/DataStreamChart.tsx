// components/DataStreamChart.tsx
import { Card, Title, Subtitle, BarChart } from "@tremor/react";

const dataKanal = [
  {
    Kanal: 'Alpha',
    'Datenstrom': 2488,
  },
  {
    Kanal: 'Beta',
    'Datenstrom': 1440,
  },
  {
    Kanal: 'Gamma',
    'Datenstrom': 788,
  },
  {
    Kanal: 'Delta',
    'Datenstrom': 2000,
  },
];

export function DataStreamChart() {
  return (
    <Card className="mt-8 bg-syntx-dark border-syntx-neon/20 shadow-syntx-glow">
      <Title className="text-syntx-neon font-mono">KANAL DATENSTROM VERTEILUNG</Title>
      <Subtitle className="text-gray-500 font-mono">
        Verteilung des erfassten Datenstroms über die aktiven Kanäle.
      </Subtitle>
      <BarChart
        className="mt-6 h-72 font-mono"
        data={dataKanal}
        index="Kanal"
        categories={['Datenstrom']}
        colors={['teal']}
        valueFormatter={(number: number) => `${Intl.NumberFormat('de').format(number)} MB`}
        yAxisWidth={48}
      />
    </Card>
  );
}
