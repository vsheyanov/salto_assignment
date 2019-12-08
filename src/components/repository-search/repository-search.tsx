import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import throttle from 'lodash.throttle';

import RepositorySearchComponent from './repository-search-component';
import { useGetSearchRepo } from '../../model/hooks';


interface Props {

}

const RepositorySearch: React.FC<Props> = () => {
    const { searchedRepo } = useGetSearchRepo();

    const history = useHistory();

    // we would like to update history string ones per second
    // in this case user will see results while typing
    const updateLocation = useCallback(
        throttle((repoStr: string) => {
            history.push(`/?repo=${repoStr}`)
        }, 1000, { leading: false }),
        []);

    const onChange = useCallback((value: string) => {
        updateLocation(value);
    }, [updateLocation]);

    return (
        <RepositorySearchComponent onChange={ onChange } searchedRepo={ searchedRepo }/>
    )
};

export default RepositorySearch;
