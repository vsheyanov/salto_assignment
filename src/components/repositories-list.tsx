import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

import { RepositorySearchItem } from '../model/interfaces';


import RepositorySearch from '../components/repository-search'

const RepositoriesList: React.FC = () => {
    const [repositories, setRepositoties] = useState<Array<RepositorySearchItem>>([]);

    const onItemsReceived = useCallback((repos: Array<RepositorySearchItem>) => {
        setRepositoties(repos);
    }, []);

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

export default RepositoriesList;
