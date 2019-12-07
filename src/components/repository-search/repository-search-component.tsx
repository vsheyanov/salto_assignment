import React, { useCallback, useState } from 'react';

import style from './repository-search.module.css';


interface Props {
    searchedRepo: string;
    onChange: (value: string) => void;
}

const RepositorySearchComponent: React.FC<Props> = ({ searchedRepo, onChange }) => {
    const [search, setSearch] = useState<string>(searchedRepo);
    const onInputChange = useCallback((e) => {
        setSearch(e.target.value);
        onChange(e.target.value);
    }, [onChange]);

    return (
        <div className={ style.searchRoot }>
            Search: <input placeholder="Enter repository name" value={ search } onChange={ onInputChange }/>
        </div>
    )
};

export default RepositorySearchComponent;
