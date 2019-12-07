import React from 'react';

import { RepositoryObject } from '../model/interfaces';

interface Props {
    repo: RepositoryObject;
}

const toLocalString = (str: string) => new Date(str).toLocaleString(navigator.language);

const RepositoryDetailsComponent: React.FC<Props> = ({ repo }) => {
    return (
        <>
            <h1>{ repo.full_name}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Forks:</td>
                        <td>{ repo.forks_count }</td>
                    </tr>
                    <tr>
                        <td>Stars:</td>
                        <td>{ repo.stargazers_count }</td>
                    </tr>
                    <tr>
                        <td>Watchers:</td>
                        <td>{ repo.watchers_count }</td>
                    </tr>
                    <tr>
                        <td>Open Issues:</td>
                        <td>{ repo.open_issues_count }</td>
                    </tr>
                    <tr>
                        <td>Created at:</td>
                        <td>{ toLocalString(repo.created_at) }</td>
                    </tr>
                    <tr>
                        <td>Pushed at:</td>
                        <td>{ toLocalString(repo.pushed_at) }</td>
                    </tr>
                    <tr>
                        <td>Updated at:</td>
                        <td>{ toLocalString(repo.updated_at) }</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default RepositoryDetailsComponent;
