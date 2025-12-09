import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/feld/reserve';
const RESERVE_STATUS = 'RESERVE_ONLINE'; //
const TIMESTAMP = new Date().toLocaleTimeString('de-DE');

export const FieldReserveStatus: React.FC = () => {
    // ... data fetching

    return (
        <div className="p-4 bg-gray-900 border-2 border-cyan-700 flex flex-col justify-between h-full">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">FELD-RESERVE STATUS (STANDBY)</h3>
            
            <div className="flex-grow flex items-center justify-center">
                <p className="text-6xl font-black text-green-500 animate-pulse-slow">{RESERVE_STATUS}</p>
            </div>
            
            <div className="mt-4">
                <p className="text-xs text-gray-600">Letzter Check: {TIMESTAMP}</p>
                <p className="text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
            </div>
        </div>
    );
};
