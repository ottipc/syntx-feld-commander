// components/SyntxStats.tsx
import { Card, Grid, Text, Flex, Metric } from "@tremor/react";

const data = [
  {
    name: "Felder Aktiv",
    value: 4,
    change: "+20%",
    status: "online"
  },
  {
    name: "Datenrate (MB/s)",
    value: 125.4,
    change: "-5%",
    status: "warning"
  },
  {
    name: "Komm. Fehler",
    value: 0,
    change: "0%",
    status: "ok"
  },
];

export function SyntxStats() {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
      {data.map((item) => (
        <Card key={item.name} className="bg-syntx-dark border-syntx-neon/20 shadow-syntx-glow">
          <Flex alignItems="start">
            <div className="space-y-0.5">
              <Text className="font-mono text-syntx-neon opacity-75">{item.name}</Text>
              <Metric className="font-mono text-white">
                {item.name === "Datenrate (MB/s)" ? item.value.toFixed(1) : item.value}
              </Metric>
            </div>
            {/* Visual Feedback LED */}
            <div 
              className={`w-3 h-3 rounded-full ${
                item.status === 'online' ? 'bg-syntx-neon shadow-syntx-glow' :
                item.status === 'warning' ? 'bg-yellow-500 shadow-yellow-500/50' :
                'bg-green-500 shadow-green-500/50'
              }`}
            />
          </Flex>
          <Text className="text-sm font-mono mt-4 text-gray-500">
            Veränderung: {item.change}
          </Text>
        </Card>
      ))}
    </Grid>
  );
}
