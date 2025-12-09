"use client";

import React, { useState } from 'react';

// Import aller Komponenten (alle 18)
import { GlobalSuccessRate } from './GlobalSuccessRate';
import { TotalCosts } from './TotalCosts';
import { DriftList } from './DriftList';
import { ScoreDistribution } from './ScoreDistribution';
import { SyntxVsNormal } from './SyntxVsNormal';
import { WrapperSuccessRate } from './WrapperSuccessRate';
import { StromQueueStatus } from './StromQueueStatus'; // Bleibt drin, kann aber durch Resonanz ersetzt werden

// Neue, detailliertere Komponenten
import { ResonanzQueueStatus } from './ResonanzQueueStatus';
import { ResonanzSystemHealth } from './ResonanzSystemHealth';
import { FullSystemHealth } from './FullSystemHealth';
import { TopicCounts } from './TopicCounts';
import { TopicScoresSummary } from './TopicScoresSummary';
import { PromptTrends } from './PromptTrends';
import { EvolutionProgressFull } from './EvolutionProgressFull';
import { FullPerformanceStats } from './FullPerformanceStats';
import { PromptsTablePlaceholder } from './PromptsTablePlaceholder';
import { EvolutionProgress } from './EvolutionProgress';
import { PerformanceStats } from './PerformanceStats';

// Tab-Definitionen
const tabs = [
    { id: 'health', name: '1. System Health & Status' },
    { id: 'evolution', name: '2. Evolution & Trends' },
    { id: 'performance', name: '3. Performance & Kosten' },
    { id: 'details', name: '4. Daten Details' },
];

export const DashboardTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    // Funktion zum Rendern des Inhalts basierend auf dem aktiven Tab
    const renderContent = () => {
        switch (activeTab) {
            case 'health':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FullSystemHealth />
                        <ResonanzSystemHealth />
                        <ResonanzQueueStatus />
                        <StromQueueStatus /> {/* Alte Komponente als Zusatz */}
                    </div>
                );
            case 'evolution':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <EvolutionProgressFull />
                        <PromptTrends />
                        <SyntxVsNormal />
                        <TopicCounts />
                        <TopicScoresSummary />
                        <EvolutionProgress /> {/* Alte Komponente als Zusatz */}
                    </div>
                );
            case 'performance':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FullPerformanceStats />
                        <GlobalSuccessRate />
                        <TotalCosts />
                        <WrapperSuccessRate />
                        <PerformanceStats /> {/* Alte Komponente als Zusatz */}
                    </div>
                );
            case 'details':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <DriftList />
                            <ScoreDistribution />
                        </div>
                        <PromptsTablePlaceholder />
                    </div>
                );
            default:
                return <div>Wähle einen Tab aus.</div>;
        }
    };

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-red-700 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            py-3 px-6 text-sm font-semibold transition-colors duration-200 
                            ${activeTab === tab.id
                                ? 'border-b-4 border-red-500 text-red-400 bg-gray-800'
                                : 'text-gray-500 hover:text-red-300 hover:bg-gray-900'
                            }
                        `}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-gray-950">
                {renderContent()}
            </div>
        </div>
    );
};
