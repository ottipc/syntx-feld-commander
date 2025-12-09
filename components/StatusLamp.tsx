import React from 'react';

interface StatusLampProps {
    status: 'Online' | 'Offline' | 'Warning' | 'Error';
    label: string;
}

export const StatusLamp: React.FC<StatusLampProps> = ({ status, label }) => {
    let colorClass = '';
    
    switch (status) {
        case 'Online':
            colorClass = 'bg-green-500';
            break;
        case 'Offline':
            colorClass = 'bg-red-500';
            break;
        case 'Warning':
            colorClass = 'bg-yellow-500';
            break;
        case 'Error':
            colorClass = 'bg-red-600';
            break;
        default:
            colorClass = 'bg-gray-500';
    }

    return (
        <span className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${colorClass} shadow-md shadow-current`} />
            <span className="font-bold text-gray-300">{label}</span>
        </span>
    );
};
