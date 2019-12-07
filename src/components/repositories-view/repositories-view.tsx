import React, { useState, useCallback } from 'react';

import { SearchRepoResponse } from '../../model/interfaces';

import RepositorySearch from '../repository-search/repository-search'
import Paginator from '../paginator/paginator';
import RepositoriesList from "./repositories-list";


const RepositoriesView: React.FC = () => {
    const [searchResponse, setSearchResponse] = useState<SearchRepoResponse | null>(null);

    const onItemsReceived = useCallback((response: SearchRepoResponse | null) => {
        setSearchResponse(response);
    }, []);

    return (
        <div>
            <RepositorySearch onItemsReceived={ onItemsReceived }/>
            {
                !searchResponse ? undefined : (
                    <>
                        <RepositoriesList items={ searchResponse.items }/>
                        <Paginator pagination={ searchResponse.pagination }/>
                    </>
                )
            }
        </div>
    );
};

export default RepositoriesView;
