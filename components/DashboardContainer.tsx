'use client';

import { Title, Text } from "@tremor/react";
import { motion } from 'framer-motion';
import { SyntxStats } from './SyntxStats';
import { DataStreamChart } from './DataStreamChart';

export function DashboardContainer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title className="text-syntx-neon text-3xl font-mono tracking-widest">
        SYNTX FELD-COMMANDER
      </Title>
      <Text className="text-gray-500 mt-2 font-mono">
        Echtzeit-Analyse der verbundenen SYNTX-Feldkanäle.
      </Text>

      <SyntxStats />
      <DataStreamChart />

    </motion.div>
  );
}
