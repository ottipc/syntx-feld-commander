import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const HEALTH_ENDPOINT = '/health';
const STROM_ENDPOINT = '/strom/health';
const API_VERSION = '2.1.0'; //
const HEALTH_STATUS = 'SYSTEM_GESUND'; //
const STROM_STATUS = 'STROM_ONLINE'; //

export const SystemHealthStatus: React.FC = () => {
    // ... data fetching

    return (
        <div className="p-4 bg-gray-900 border-2 border-cyan-700">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">KERN-SYSTEM HEALTH STATUS</h3>
            
            <div className="space-y-4">
                <div className="p-3 bg-gray-800 border-l-4 border-green-500">
                    <p className="text-sm text-gray-400">API VERSION</p>
                    <p className="text-3xl font-black text-green-400">{API_VERSION}</p>
                </div>
                
                <div className="p-3 bg-gray-800 border-l-4 border-green-500">
                    <p className="text-sm text-gray-400">KERN-STATUS ({HEALTH_ENDPOINT})</p>
                    <p className="text-3xl font-black text-green-400">{HEALTH_STATUS}</p>
                </div>

                <div className="p-3 bg-gray-800 border-l-4 border-green-500">
                    <p className="text-sm text-gray-400">STROM-STATUS ({STROM_ENDPOINT})</p>
                    <p className="text-3xl font-black text-green-400">{STROM_STATUS}</p>
                </div>
            </div>
            
        </div>
    );
};
