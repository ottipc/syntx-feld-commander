"use client";

import React from 'react';
import { DashboardTabs } from '../components/DashboardTabs';

export const DashboardContainer: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <header className="mb-10 border-b border-red-700 pb-4">
                <h1 className="text-4xl font-extrabold text-red-500 tracking-wider">
                    SYNTX FELD KOMMANDOZENTRALE
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    API-Target: https://dev.syntx-system.com - (Tab-Ansicht)
                </p>
            </header>

            <DashboardTabs />
            
            <footer className="text-center text-xs text-gray-700 mt-10 pt-4 border-t border-gray-800">
                Data polled every 30 seconds via useSyntxData hook.
            </footer>
        </div>
    );
};
