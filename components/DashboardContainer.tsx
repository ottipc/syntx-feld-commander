import React from 'react';
// Importiere ZYKLUS 1 Komponenten
import { ResonanceGauge } from './ResonanceGauge'; 
import { CriticalAnomalyTile } from './CriticalAnomalyTile'; 
// Importiere ZYKLUS 2 Komponenten
import { FlowLoadBar } from './FlowLoadBar'; 
import { GlobalSuccessRate } from './GlobalSuccessRate'; 
// Importiere ZYKLUS 3 Komponenten
import { TopicDriftChart } from './TopicDriftChart';
import { TrendVelocityMeter } from './TrendVelocityMeter';
// Importiere ZYKLUS 4 Komponenten
import { WrapperPerformanceTile } from './WrapperPerformanceTile';
import { DurationAnalysisTile } from './DurationAnalysisTile';
// Importiere ZYKLUS 5 Komponenten
import { CostAnalysisTile } from './CostAnalysisTile';
import { DriftLogView } from './DriftLogView';
// Importiere ZYKLUS 6 Komponenten
import { EvolutionProtocolTable } from './EvolutionProtocolTable';
import { SystemHealthStatus } from './SystemHealthStatus';
// Importiere ZYKLUS 7 Komponenten
import { DataStreamChart } from './DataStreamChart';
import { SyntxStats } from './SyntxStats';
// Importiere NEUE Komponenten (Zyklus 8)
import { TopFailingTopics } from './TopFailingTopics';
import { FieldReserveStatus } from './FieldReserveStatus';


const DashboardContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white font-mono">
      <h1 className="text-4xl font-bold text-red-500 mb-8">SYNTX FELD-COMMANDER TESTANSICHT (PHASE 8/8 - FINAL)</h1>
      
      {/* 🔴 ZYKLUS 1: KERN-DRIFT 🔴 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 1: KERN-DRIFT</h2>
        <ResonanceGauge /> 
        <CriticalAnomalyTile />
      </div>

      {/* 🌊 ZYKLUS 2: FLUSS-STATUS & GLOBALERFOLG 🌊 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 2: STROM & ERFOLG</h2>
        <FlowLoadBar />
        <GlobalSuccessRate />
      </div>
      
      {/* 📊 ZYKLUS 3: FELD-ANALYSE 📊 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 3: FELD-ANALYSE</h2>
        <TopicDriftChart />
        <TrendVelocityMeter />
      </div>

      {/* ⏱️ ZYKLUS 4: WRAPPER & PERFORMANCE ⏱️ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 4: WRAPPER & PERFORMANCE</h2>
        <WrapperPerformanceTile />
        <DurationAnalysisTile />
      </div>
      
      {/* 💸 ZYKLUS 5: KOSTEN & DRIFTKÖRPER 💸 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 5: KOSTEN & DRIFTKÖRPER</h2>
        <CostAnalysisTile />
        <DriftLogView />
      </div>

      {/* 📈 ZYKLUS 6: EVOLUTION & SYSTEM-HEALTH 📈 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 6: EVOLUTION & SYSTEM-HEALTH</h2>
        <EvolutionProtocolTable />
        <SystemHealthStatus />
      </div>
      
      {/* 📊 ZYKLUS 7: DATEN-VISUALISIERUNG & STATISTIKEN 📊 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-cyan-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 7: DATEN-VISUALISIERUNG & STATISTIKEN</h2>
        <DataStreamChart />
        <SyntxStats />
      </div>
      
      {/* 🚧 ZYKLUS 8: FINALE ANOMALIE-ANALYSE 🚧 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 border border-cyan-800">
        <h2 className="col-span-full text-xl font-bold text-red-400 border-b border-cyan-800 pb-2 mb-4">ZYKLUS 8: FINALE ANOMALIE-ANALYSE</h2>
        <TopFailingTopics />
        <FieldReserveStatus />
      </div>

    </div>
  );
};

export default DashboardContainer;
