import React, {useCallback} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './api-stats.module.css';

import { setPrivateToken } from '../../model/store/actions/actions';


const ApiStatsComponent: React.FC = () => {
    const stats = useSelector((s: any) => s.apiRequest);
    const privateToken = useSelector((s: any) => s.privateToken);
    const setApiAuth = useCallback((e) => {
        setPrivateToken(e.target.value);
    }, []);
    return (
        <div className={ style.apiStats }>
            <div>Last request successful: {stats.success ? 'yes' : 'no'}</div>
            <div>Round trip in: {stats.time}ms</div>
            {
                stats.message === '' ? undefined : (
                    <div>Error: {stats.message}</div>
                )
            }
            <br/>
            <div>
                <div><a href="https://github.com/settings/tokens" rel="noopener noreferrer" target="_blank">Get token</a></div>
                <input placeholder="token" onChange={ setApiAuth }/>
                {
                    !privateToken ? undefined : (
                        <div><Link to="/?private=true">Show private repos</Link></div>
                    )
                }
            </div>
        </div>
    );
};

export default ApiStatsComponent;
