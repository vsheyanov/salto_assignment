import React, {useCallback, useEffect, useState} from 'react';
import { useLocation, useHistory} from "react-router-dom";
import queryString from 'query-string'
import throttle from 'lodash.throttle';

import apiController from '../controllers/api-controller';

import { RepositorySearchItem, SearchRepoResponse, ErrorResponse } from '../model/interfaces';


interface Props {
    onItemsReceived: (items: Array<RepositorySearchItem>) => void;
}

const RepositorySearch: React.FC<Props> = ({ onItemsReceived }) => {
    const locationSearch = queryString.parse(useLocation().search);
    const searchedRepo = String(locationSearch.repo) || '';

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
    }, []);

    const searchRepo = useCallback((searchValue: string) => {
        if (searchValue.trim().length < 3) { return; }

        apiController.searchRepos(searchValue)
            .then((data: SearchRepoResponse | ErrorResponse) => {
                if ((data as ErrorResponse).message) {
                    return;
                }
                onItemsReceived((data as SearchRepoResponse).items);
            })
    }, []);

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            updateLocation(search);
        }
    }, [search]);


    useEffect(() => {
        searchRepo(searchedRepo);
    }, [searchedRepo]);
    return <input value={search} onChange={ onChange } onKeyDown={ onKeyDown }/>
};

export default RepositorySearch;
