import React from 'react';
import { Link } from 'react-router-dom';

import style from './paginator.module.css';

import { Pagination } from '../../model/interfaces';
import { useGetSearchRepo } from '../../model/hooks';

interface Props {
    pagination: Pagination;
}

const PaginatorComponent: React.FC<Props> = ({ pagination }) => {
    const { searchedRepo } = useGetSearchRepo();
    return (
        <div className={ style.paginatorRoot }>
            { pagination.first && <Link to={`/?repo=${searchedRepo}&page=${pagination.first}`}>{`<<`} first </Link> }
            { pagination.prev && <Link to={`/?repo=${searchedRepo}&page=${pagination.prev}`}>{`<`} prev </Link> }
            { pagination.next && <Link to={`/?repo=${searchedRepo}&page=${pagination.next}`}> next {`>`}</Link> }
            { pagination.last && <Link to={`/?repo=${searchedRepo}&page=${pagination.last}`}> last {`>>`}</Link> }
        </div>
    );
};

export default React.memo(PaginatorComponent);
