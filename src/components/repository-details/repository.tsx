import React, { useEffect, useState } from 'react';
import apiController from '../../controllers/api-controller';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

import RepositoryDetailsComponent from './repository-details';
import { RepositoryObject, ErrorResponse } from '../../model/interfaces';


const RepositoryComponent: React.FC = () => {
    const { owner, repo } = useParams();

    const [repository, setRepository] = useState<RepositoryObject | undefined | ErrorResponse>();
    const [readme, setReadme] = useState<string>('');

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
        apiController.getRepositoryReadme(owner, repo)
            .then((readme: string) => {
                setReadme(readme);
            });
    }, [owner, repo]);

    if (repository && (repository as ErrorResponse).message) {
        const errorResponse: ErrorResponse = repository as ErrorResponse;
        return <div>{ errorResponse.message }</div>;
    }

    const fullName = `${owner}/${repo}`;

    return (
        <>
            <RepositoryDetailsComponent fullName={ fullName } repo={ repository as RepositoryObject }/>
            <Markdown source={ readme } skipHtml={ false } escapeHtml={ false }/>
        </>
    );
};

export default RepositoryComponent;
