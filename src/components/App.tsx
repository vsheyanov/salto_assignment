import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';


import logo from '../logo.svg';
import '../App.css';

import { RepositorySearchItem } from '../model/interfaces';


import RepositorySearch from '../components/repository-search'

const App: React.FC = () => {
    const [repositories, setRepositoties] = useState<Array<RepositorySearchItem>>([]);

    const onItemsReceived = useCallback((repos: Array<RepositorySearchItem>) => {
        setRepositoties(repos);
    }, []);

    console.log();

    return (
        <div className="App">

            <RepositorySearch onItemsReceived={ onItemsReceived }/>

            <table>
                <thead>
                    <tr><th>id</th><th>owner</th></tr>
                </thead>
                <tbody>
                {
                    repositories.map((repo: RepositorySearchItem) => (
                        <tr key={ repo.id }>
                            <td>
                                <Link to={`repo/${repo.full_name}`}>{repo.full_name}</Link>
                            </td>
                            <td>
                                { repo.owner.login }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
};

export default App;
