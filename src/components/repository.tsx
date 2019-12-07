import React, {useCallback, useEffect, useState} from 'react';
import apiController from '../controllers/api-controller';
import { useParams } from 'react-router-dom';

import RepositoryDetailsComponent from './repository-details';
import { RepositoryObject, ErrorResponse } from '../model/interfaces';


const RepositoryComponent: React.FC = () => {
    const { owner, repo } = useParams();

    const [repository, setRepository] = useState<RepositoryObject | undefined | ErrorResponse>();

    useEffect(() => {
        if (!owner || !repo) { return; }

        apiController.getRepository(owner, repo)
            .then((repo: RepositoryObject | ErrorResponse) => {
                if ((repo as ErrorResponse).message) {
                    setRepository(repo as ErrorResponse);
                    return;
                }
                setRepository(repo as RepositoryObject);
            });
    }, [owner, repo]);

    if (repository && (repository as ErrorResponse).message) {
        const errorResponse: ErrorResponse = repository as ErrorResponse;
        return <div>{ errorResponse.message }</div>;
    }

    return !repository
        ? <div>Getting data about repo</div>
        : <RepositoryDetailsComponent repo={ repository as RepositoryObject }/>;
};

export default RepositoryComponent;
