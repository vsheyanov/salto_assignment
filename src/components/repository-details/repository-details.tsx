import React from 'react';

import { RepositoryObject } from '../../model/interfaces';

interface Props {
    fullName: string;
    repo?: RepositoryObject;
}

const toLocalString = (str: string) => new Date(str).toLocaleString(navigator.language);

const RepositoryDetailsComponent: React.FC<Props> = ({ fullName, repo }) => {
    const repository = repo && repo.result;
    return (
        <>
            <h1>{ fullName }</h1>
            {
                !repository ? 'Getting data about repository' : (
                    <table id="repository-details-table">
                        <tbody>
                        <tr>
                            <td>Forks:</td>
                            <td>{ repository.forks_count }</td>
                        </tr>
                        <tr>
                            <td>Stars:</td>
                            <td>{ repository.stargazers_count }</td>
                        </tr>
                        <tr>
                            <td>Watchers:</td>
                            <td>{ repository.watchers_count }</td>
                        </tr>
                        <tr>
                            <td>Open Issues:</td>
                            <td>{ repository.open_issues_count }</td>
                        </tr>
                        <tr>
                            <td>Created at:</td>
                            <td>{ toLocalString(repository.created_at) }</td>
                        </tr>
                        <tr>
                            <td>Pushed at:</td>
                            <td>{ toLocalString(repository.pushed_at) }</td>
                        </tr>
                        <tr>
                            <td>Updated at:</td>
                            <td>{ toLocalString(repository.updated_at) }</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        </>
    );
};

export default React.memo(RepositoryDetailsComponent);
