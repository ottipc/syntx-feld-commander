import React from 'react';

interface FlowLoadBarProps {
    value: number;
    max: number;
    label: string;
    criticalThreshold?: number; // z.B. 80%
}

export const FlowLoadBar: React.FC<FlowLoadBarProps> = ({ value, max, label, criticalThreshold = 80 }) => {
    const percentage = (value / max) * 100;
    const isCritical = percentage >= criticalThreshold;
    
    let barColor = 'bg-cyan-600';
    if (percentage > 50 && !isCritical) {
        barColor = 'bg-yellow-600';
    } else if (isCritical) {
        barColor = 'bg-red-600';
    }
    
    // Stellt sicher, dass die Breite nicht über 100% geht
    const width = Math.min(percentage, 100);

    return (
        <div className="w-full">
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${barColor}`}
                    style={{ width: `${width}%` }}
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                ></div>
            </div>
        </div>
    );
};
