import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/resonanz/system';

// Typisierung basierend auf der tatsächlichen API-Antwort von /resonanz/system
interface ResonanceData {
    status: string;
    system_zustand: 'KRITISCH' | 'WARNUNG' | 'NORMAL';
    resonanz_felder: {
        qualität: { durchschnitt: number; resonanz: string; };
    };
}

export const ResonanceGauge: React.FC = () => {
  const { data, isLoading, isError, fullUrl } = useSyntxData<ResonanceData>(SYNTX_ENDPOINT);

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse">
        <h3 className="text-lg font-bold text-red-400 mb-4">SYSTEM-RESONANZ STATUS</h3>
        <p className="text-3xl text-gray-500">Daten von {SYNTX_ENDPOINT} werden geladen...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 bg-gray-900 border-2 border-red-700">
        <h3 className="text-lg font-bold text-red-400 mb-4">SYSTEM-RESONANZ STATUS</h3>
        <p className="text-xl text-red-500 font-bold">FEHLER: Konnte nicht von {fullUrl} laden.</p>
      </div>
    );
  }

  const avgScore = data.resonanz_felder.qualität.durchschnitt || 0;
  const status = data.system_zustand || 'UNBEKANNT';

  const indicatorColor = status === 'KRITISCH' ? 'text-red-500' : 
                         status === 'WARNUNG' ? 'text-yellow-500' : 'text-cyan-500';

  return (
    <div className="p-4 bg-gray-900 border-2 border-red-700">
      <h3 className="text-lg font-bold text-red-400 mb-4">SYSTEM-RESONANZ STATUS</h3>
      
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-5xl font-black" style={{ color: indicatorColor }}>{avgScore.toFixed(2)}</p>
          <p className="text-xl font-bold font-mono" style={{ color: indicatorColor }}>{status}</p>
        </div>
        
        <div className="text-right text-sm text-gray-500">
          <p>Durchschnittlicher Score (Qualität)</p>
          <p className="break-all">URL: {fullUrl}</p>
        </div>
      </div>
    </div>
  );
};
