import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import throttle from 'lodash.throttle';

import apiController from '../../controllers/api-controller';

import { SearchRepoResponse, ErrorResponse } from '../../model/interfaces';

import { useGetSearchRepo } from '../../model/hooks';

import style from './repository-search.module.css';


interface Props {
    onItemsReceived: (response: SearchRepoResponse | null) => void;
}

const RepositorySearch: React.FC<Props> = ({ onItemsReceived }) => {
    const { searchedRepo, page } = useGetSearchRepo();

    const history = useHistory();

    // we would like to update history string ones per second
    // in this case user will see results while typing
    const updateLocation = useCallback(
        throttle((repoStr: string) => {
            history.push(`/?repo=${repoStr}`)
        }, 1000, { leading: false }),
        []);

    const [search, setSearch] = useState<string>(searchedRepo);
    const onChange = useCallback((e) => {
        setSearch(e.target.value);
        updateLocation(e.target.value);
    }, [updateLocation]);

    const searchRepo = useCallback((searchValue: string, page?: number) => {
        if (searchValue.trim().length < 1) {
            onItemsReceived(null);
            return;
        }

        apiController.searchRepos(searchValue, page)
            .then((data: SearchRepoResponse | ErrorResponse) => {
                if ((data as ErrorResponse).message) {
                    return;
                }
                onItemsReceived((data as SearchRepoResponse));
            })
    }, [onItemsReceived]);

    useEffect(() => {
        searchRepo(searchedRepo, page);
    }, [searchRepo, searchedRepo, page]);
    return (
        <div className={ style.searchRoot }>
            Search: <input placeholder="Enter repository name" value={search} onChange={ onChange }/>
        </div>
    )
};

export default RepositorySearch;
