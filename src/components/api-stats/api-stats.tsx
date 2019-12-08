import React from 'react';
import { useSelector } from 'react-redux';

import style from './api-stats.module.css';


const ApiStatsComponent: React.FC = () => {
    const stats = useSelector((s: any) => s.apiRequest);
    return (
        <div className={ style.apiStats }>
            <div>Last request successful: {stats.success ? 'yes' : 'no'}</div>
            <div>Round trip in: {stats.time}ms</div>
            {
                stats.message === '' ? undefined : (
                    <div>Error: {stats.message}</div>
                )
            }
        </div>
    );
};

export default ApiStatsComponent;
