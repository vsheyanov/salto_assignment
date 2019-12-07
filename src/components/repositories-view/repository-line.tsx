import React from 'react';
import { Link } from 'react-router-dom';

import { RepositorySearchItem } from '../../model/interfaces';

interface Props {
    item: RepositorySearchItem;
}

const RepositoryLine: React.FC<Props> = ({ item }) => {
    return (
        <tr key={ item.id }>
            <td>
                <Link to={`repo/${item.full_name}`}>{item.full_name}</Link>
            </td>
            <td>
                { item.owner.login }
            </td>
        </tr>
    );
};

export default React.memo(RepositoryLine);
