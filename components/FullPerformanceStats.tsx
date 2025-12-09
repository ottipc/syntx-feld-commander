import React from 'react';
import { useSyntxData } from './useSyntxData';

const SYNTX_ENDPOINT = '/analytics/performance';

interface WrapperPerformance {
    avg_ms: number;
    min_ms: number;
    max_ms: number;
    count: number;
}

interface PerformanceData {
    status: string;
    gesamt: WrapperPerformance & { total_jobs: number };
    by_wrapper: { [key: string]: WrapperPerformance };
}

export const FullPerformanceStats: React.FC = () => {
    const { data, isLoading, isError } = useSyntxData<PerformanceData>(SYNTX_ENDPOINT);

    if (isLoading) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 animate-pulse text-gray-500">Lade Full Performance Stats...</div>;
    }
    
    if (isError || !data) {
        return <div className="p-4 bg-gray-900 border-2 border-red-700 text-red-500">Fehler beim Laden der Performance.</div>;
    }

    const { gesamt, by_wrapper } = data;

    return (
        <div className="p-4 bg-gray-900 border-2 border-red-700">
            <h3 className="text-lg font-bold text-red-400 mb-4">FULL PERFORMANCE ANALYSE ({gesamt.total_jobs} Jobs)</h3>
            
            <div className="text-sm space-y-3">
                <div className="border-b border-gray-700 pb-2">
                    <p className="text-gray-400 font-semibold mb-1">GESAMT STATISTIKEN</p>
                    <div className="flex justify-between ml-3">
                        <span className="text-gray-500">Avg. Dauer:</span>
                        <span className="font-bold text-cyan-400">{(gesamt.avg_ms / 1000).toFixed(2)} s</span>
                    </div>
                    <div className="flex justify-between ml-3">
                        <span className="text-gray-500">Max. Dauer:</span>
                        <span className="font-bold text-yellow-400">{(gesamt.max_ms / 1000).toFixed(2)} s</span>
                    </div>
                </div>

                <p className="text-gray-400 font-semibold">PERFORMANCE BY WRAPPER</p>
                {Object.entries(by_wrapper).map(([wrapper, stats]) => (
                    <div key={wrapper} className="ml-3 space-y-0.5">
                        <p className="text-red-300 font-bold capitalize">{wrapper} ({stats.count} Jobs)</p>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Avg.:</span>
                            <span className="text-green-400">{(stats.avg_ms / 1000).toFixed(2)} s</span>
                            <span className="text-gray-500">Max.:</span>
                            <span className="text-yellow-400">{(stats.max_ms / 1000).toFixed(2)} s</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
