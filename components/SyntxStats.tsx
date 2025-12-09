import React from 'react';
// import { useSyntxData } from '~/hooks/syntx';

const SYNTX_ENDPOINT = '/analytics/syntx-stats';
const STATS_DATA = [ // Daten aus
    { label: 'FELD-KANÄLE AKTIV', value: 332, color: 'text-green-400' },
    { label: 'GERINGFÜGIGE STEIGERUNG', value: 332, color: 'text-yellow-400' },
    { label: 'DATENRATE (MB/S)', value: 4.50, color: 'text-cyan-400' },
    { label: 'OPTIMIERUNGSZIEL ERREICHT', value: 275, color: 'text-red-500' }, // Sollte grün sein, ist aber rot (Error!)
    { label: 'KOMM. FEHLER', value: 275, color: 'text-red-500' },
    { label: 'ERKANNT & KORRIGIERT', value: 275, color: 'text-green-400' },
];

export const SyntxStats: React.FC = () => {
    // ... data fetching

    return (
        <div className="p-4 bg-gray-900 border-2 border-cyan-700">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">SYNTAX STATISTIKEN (GESAMT)</h3>
            
            <div className="grid grid-cols-2 gap-4">
                {STATS_DATA.map((item) => (
                    <div key={item.label} className="p-3 bg-gray-800 border-l-4 border-cyan-500">
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className={`text-3xl font-black ${item.color}`}>{item.value.toLocaleString('de-DE')}</p>
                    </div>
                ))}
            </div>
            
            <p className="mt-4 text-xs text-gray-600">Datenquelle: {SYNTX_ENDPOINT}</p>
        </div>
    );
};
