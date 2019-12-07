import React from 'react';
import { useSelector } from 'react-redux';

import './api-stats.css';


const ApiStatsComponent: React.FC = () => {
    const stats = useSelector((s: any) => s.apiRequest);
    return (
        <div className="api-stats">
            <div>Last request successful: {stats.success ? 'yes' : 'no'}</div>
            <div>Round trip in: {stats.time}ms</div>
        </div>
    );
};

export default ApiStatsComponent;
