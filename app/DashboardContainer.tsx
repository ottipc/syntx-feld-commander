"use client";

import React from 'react';

// Kern-Komponenten (Basierend auf den ersten 9)
import { GlobalSuccessRate } from '../components/GlobalSuccessRate';
import { TotalCosts } from '../components/TotalCosts';
import { DriftList } from '../components/DriftList';
import { ScoreDistribution } from '../components/ScoreDistribution';
import { SyntxVsNormal } from '../components/SyntxVsNormal';
import { WrapperSuccessRate } from '../components/WrapperSuccessRate';
import { StromQueueStatus } from '../components/StromQueueStatus';

// NEUE, detailliertere Komponenten (Basierend auf den zusätzlichen 9 Endpunkten)
import { ResonanzQueueStatus } from '../components/ResonanzQueueStatus';
import { ResonanzSystemHealth } from '../components/ResonanzSystemHealth';
import { FullSystemHealth } from '../components/FullSystemHealth';
import { TopicCounts } from '../components/TopicCounts';
import { TopicScoresSummary } from '../components/TopicScoresSummary';
import { PromptTrends } from '../components/PromptTrends';
import { EvolutionProgressFull } from '../components/EvolutionProgressFull';
import { FullPerformanceStats } from '../components/FullPerformanceStats';
import { PromptsTablePlaceholder } from '../components/PromptsTablePlaceholder';

export const DashboardContainer: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <header className="mb-10 border-b border-red-700 pb-4">
                <h1 className="text-4xl font-extrabold text-red-500 tracking-wider">
                    SYNTX FELD KOMMANDOZENTRALE: MAXIMAL-ANSICHT
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    API-Target: https://dev.syntx-system.com
                </p>
            </header>

            {/* Raster-Layout 1: System Health & Queue Status (3x3) */}
            <h2 className="text-2xl font-bold text-gray-300 mb-4 border-b border-gray-800 pb-2">▶ SYSTEM STATISTIKEN</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                <FullSystemHealth /> 
                <ResonanzSystemHealth />
                <ResonanzQueueStatus />
            </div>

            {/* Raster-Layout 2: Analytics & Trends (3x3) */}
            <h2 className="text-2xl font-bold text-gray-300 mb-4 border-b border-gray-800 pb-2">▶ PROMPT & EVOLUTION</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                <EvolutionProgressFull />
                <PromptTrends />
                <SyntxVsNormal />
            </div>

            {/* Raster-Layout 3: Performance, Kosten & Wrappers (3x3) */}
            <h2 className="text-2xl font-bold text-gray-300 mb-4 border-b border-gray-800 pb-2">▶ PERFORMANCE & KOSTEN</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                <FullPerformanceStats />
                <GlobalSuccessRate />
                <TotalCosts />
            </div>

            {/* Raster-Layout 4: Detail & Distribution (3x3) */}
            <h2 className="text-2xl font-bold text-gray-300 mb-4 border-b border-gray-800 pb-2">▶ FELD & TOPIC ANALYSE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                <TopicCounts />
                <TopicScoresSummary />
                <WrapperSuccessRate />
            </div>

            {/* Layout 5: Breite Komponenten */}
            <h2 className="text-2xl font-bold text-gray-300 mb-4 border-b border-gray-800 pb-2">▶ BREITE ANSICHTEN</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <DriftList />
                <ScoreDistribution /> 
            </div>

            {/* Layout 6: Tabelle (Vollständige Breite) */}
            <div className="mt-8">
                <PromptsTablePlaceholder />
            </div>

            <footer className="text-center text-xs text-gray-700 mt-10 pt-4 border-t border-gray-800">
                Data polled every 30 seconds via useSyntxData hook.
            </footer>
        </div>
    );
};
