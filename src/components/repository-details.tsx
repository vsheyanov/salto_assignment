import React, {useCallback, useEffect, useState} from 'react';
import apiController from '../controllers/api-controller';
import {Link, useParams} from 'react-router-dom';

import {RepositoryObject, ErrorResponse, RepositorySearchItem} from '../model/interfaces';

interface Props {
    repo: RepositoryObject;
}

const RepositoryDetailsComponent: React.FC<Props> = ({ repo }) => {

    /*
    see stats like
    - owner details,
    - short sniped from the README.MD file,
    repository details:
     - forks/
     - issues/
     - watchers/etc...
     */
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
                </tbody>
            </table>
        </>
    );
};

export default RepositoryDetailsComponent;
