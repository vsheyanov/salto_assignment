import React from 'react';

import { RepositorySearchItem } from '../../model/interfaces';

import styles from './repositories-list.module.css';
import RepositoryLine from "./repository-line";

interface Props {
    items: Array<RepositorySearchItem>
}


const RepositoriesList: React.FC<Props> = ({ items }) => {
    if (items.length === 0) { return <div>No respositories found</div> }

    return (
        <table className={ styles.repoTable }>
            <thead>
            <tr><th>repository</th><th>owner</th></tr>
            </thead>
            <tbody>
            {
                items.map((repo: RepositorySearchItem) => (
                    <RepositoryLine key={ repo.id } item={ repo }/>
                ))
            }
            </tbody>
        </table>
    );
};

export default RepositoriesList;
