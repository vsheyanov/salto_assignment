import React from 'react';
import ApiStatsComponent from './api-stats';

const MainView: React.FC = ({ children }) => {
    return (
        <div>
            { children }
            <ApiStatsComponent/>
        </div>
    );
};

export default MainView;
