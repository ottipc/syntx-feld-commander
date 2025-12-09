"use client";

import React from 'react';

// Import aller zuvor erstellten/korrigierten Komponenten (relative Pfade)
import { GlobalSuccessRate } from '../components/GlobalSuccessRate';
import { EvolutionProgress } from '../components/EvolutionProgress';
import { ScoreDistribution } from '../components/ScoreDistribution';
import { DriftList } from '../components/DriftList';
import { TotalCosts } from '../components/TotalCosts';
import { PerformanceStats } from '../components/PerformanceStats';
import { WrapperSuccessRate } from '../components/WrapperSuccessRate';
import { SyntxVsNormal } from '../components/SyntxVsNormal';
import { StromQueueStatus } from '../components/StromQueueStatus';

export const DashboardContainer: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <header className="mb-10 border-b border-red-700 pb-4">
                <h1 className="text-4xl font-extrabold text-red-500 tracking-wider">
                    SYNTX FELD KOMMANDOZENTRALE
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    API-Target: https://dev.syntx-system.com
                </p>
            </header>

            {/* Raster-Layout für die Hauptmetriken */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Obere Reihe: Allgemeine Vitalparameter */}
                <GlobalSuccessRate />
                <PerformanceStats />
                <StromQueueStatus />
            </div>

            {/* Zweite Reihe: Evolution & Kosten */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <EvolutionProgress />
                <SyntxVsNormal />
                <TotalCosts />
            </div>

            {/* Dritte Reihe: Detailansichten (Breite Spalten) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <WrapperSuccessRate />
                <DriftList />
            </div>

            {/* Vierte Reihe: Score Distribution (nimmt volle Breite ein) */}
            <div className="mt-8">
                <ScoreDistribution />
            </div>
            
            <footer className="text-center text-xs text-gray-700 mt-10 pt-4 border-t border-gray-800">
                Data polled every 30 seconds via useSyntxData hook.
            </footer>
        </div>
    );
};
