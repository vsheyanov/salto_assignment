import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import throttle from 'lodash.throttle';

import apiController from '../controllers/api-controller';

import { SearchRepoResponse, ErrorResponse } from '../model/interfaces';

import { useGetSearchRepo } from '../model/hooks';

import './repository-search.css';


interface Props {
    onItemsReceived: (response: SearchRepoResponse) => void;
}

const RepositorySearch: React.FC<Props> = ({ onItemsReceived }) => {
    const { searchedRepo, page } = useGetSearchRepo();

    const history = useHistory();

    const updateLocation = useCallback(
        throttle((repoStr: string) => {
            history.push(`/?repo=${repoStr}`)
        }, 1000),
        []);

    const [search, setSearch] = useState<string>(searchedRepo);
    const onChange = useCallback((e) => {
        setSearch(e.target.value);
        updateLocation(e.target.value);
    }, [updateLocation]);

    const searchRepo = useCallback((searchValue: string, page?: number) => {
        if (searchValue.trim().length < 3) { return; }

        apiController.searchRepos(searchValue, page)
            .then((data: SearchRepoResponse | ErrorResponse) => {
                if ((data as ErrorResponse).message) {
                    return;
                }
                onItemsReceived((data as SearchRepoResponse));
            })
    }, [onItemsReceived]);

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            updateLocation(search);
        }
    }, [updateLocation, search]);


    useEffect(() => {
        searchRepo(searchedRepo, page);
    }, [searchRepo, searchedRepo, page]);
    return (
        <div className="search-root">
            Search: <input value={search} onChange={ onChange } onKeyDown={ onKeyDown }/>
        </div>
    )
};

export default RepositorySearch;
