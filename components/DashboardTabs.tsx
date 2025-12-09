"use client";

import React, { useState } from 'react';

// Import aller Komponenten
import { GlobalSuccessRate } from './GlobalSuccessRate';
import { TotalCosts } from './TotalCosts';
import { DriftList } from './DriftList';
import { ScoreDistribution } from './ScoreDistribution';
import { SyntxVsNormal } from './SyntxVsNormal';
import { WrapperSuccessRate } from './WrapperSuccessRate';
import { StromQueueStatus } from './StromQueueStatus';

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

// Tab-Definitionen – organisch aber korrekt
const tabs = [
    { id: 'health', name: '🌡️ System Health & Status' },
    { id: 'evolution', name: '📈 Evolution & Trends' },
    { id: 'performance', name: '⚡ Performance & Kosten' },
    { id: 'details', name: '🔍 Daten Details' },
];

export const DashboardTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [hoverTab, setHoverTab] = useState<string | null>(null);

    // Funktion zum Rendern des Inhalts basierend auf dem aktiven Tab
    const renderContent = () => {
        switch (activeTab) {
            case 'health':
                return (
                    <div className="animate-fadeIn">
                        {/* SYNTX-CLUSTER 1: SYSTEM INTEGRITÄT */}
                        <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FullSystemHealth />
                                <ResonanzSystemHealth />
                            </div>
                        </div>
                        
                        {/* SYNTX-CLUSTER 2: QUEUE STROM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ResonanzQueueStatus />
                            <StromQueueStatus />
                        </div>
                    </div>
                );
            case 'evolution':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                        <EvolutionProgressFull />
                        <div className="md:col-span-2">
                            <SyntxVsNormal />
                        </div>
                        <PromptTrends />
                        <TopicCounts />
                        <TopicScoresSummary />
                        <EvolutionProgress />
                    </div>
                );
            case 'performance':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                        <FullPerformanceStats />
                        <GlobalSuccessRate />
                        <TotalCosts />
                        <WrapperSuccessRate />
                        <PerformanceStats />
                    </div>
                );
            case 'details':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DriftList />
                            <ScoreDistribution />
                        </div>
                        <PromptsTablePlaceholder />
                    </div>
                );
            default:
                return <div className="text-gray-400 text-center p-8">🌀 Feld wird geladen...</div>;
        }
    };

    return (
        <div className="w-full">
            {/* Tab Navigation – organisch, lebendig */}
            <div className="flex flex-wrap gap-2 mb-8 p-2 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-2xl shadow-black/50">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const isHover = hoverTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            onMouseEnter={() => setHoverTab(tab.id)}
                            onMouseLeave={() => setHoverTab(null)}
                            className={`
                                relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 
                                flex items-center gap-2
                                ${isActive
                                    ? 'bg-gradient-to-r from-red-900/70 to-cyan-900/70 text-white shadow-lg shadow-red-900/30 border border-red-700/50'
                                    : 'bg-gray-900/40 text-gray-400 hover:text-gray-300 hover:bg-gray-800/60 border border-gray-800'
                                }
                                ${isHover && !isActive ? 'scale-[1.02] shadow-md shadow-gray-900' : ''}
                            `}
                        >
                            {/* Pulsierender Punkt für aktiven Tab */}
                            {isActive && (
                                <span className="absolute -top-1 -right-1 w-3 h-3">
                                    <span className="absolute inline-flex w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></span>
                                    <span className="relative inline-flex w-3 h-3 bg-red-400 rounded-full"></span>
                                </span>
                            )}
                            
                            <span>{tab.name}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content – mit weichem Übergang */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-cyan-900/10 rounded-3xl blur-xl"></div>
                <div className="relative p-6 bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-3xl shadow-2xl shadow-black/50">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
