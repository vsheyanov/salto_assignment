import React, { useState, useCallback } from 'react';

import { SearchRepoResponse } from '../../model/interfaces';

import RepositorySearch from '../repository-search'
import Paginator from '../paginator';
import RepositoriesList from "./repositories-list";


const RepositoriesView: React.FC = () => {
    const [searchResponse, setSearchResponse] = useState<SearchRepoResponse | null>(null);

    const onItemsReceived = useCallback((response: SearchRepoResponse) => {
        setSearchResponse(response);
    }, []);

    return (
        <div className="App">
            <RepositorySearch onItemsReceived={ onItemsReceived }/>

            {
                !searchResponse ? undefined : (
                    <RepositoriesList items={ searchResponse.items }/>
                )
            }
            {
                searchResponse
                && <Paginator pagination={ searchResponse.pagination }/>
            }
        </div>
    );
};

export default RepositoriesView;
