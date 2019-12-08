import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import { ErrorResponse, SearchRepoResponse } from '../../model/interfaces';

import RepositorySearch from '../repository-search/repository-search'
import Paginator from '../paginator/paginator';
import RepositoriesList from "./repositories-list";
import { useGetSearchRepo } from "../../model/hooks";
import apiController from "../../controllers/api-controller";


const RepositoriesView: React.FC = () => {
    const { searchedRepo, page, privateRepo } = useGetSearchRepo();
    const [searchResponse, setSearchResponse] = useState<SearchRepoResponse | null>(null);
    const [lastRequestError, setLastRequestError] = useState<ErrorResponse | null>(null);
    const privateToken = useSelector((s: any) => s.privateToken);

    useEffect(() => {
        if (!privateRepo && searchedRepo.trim().length < 1) {
            setSearchResponse(null);
            return;
        }

        (privateRepo
            ? apiController.getUserRepos(privateToken, page)
            : apiController.searchRepos(searchedRepo, page))
            .then((data: SearchRepoResponse | ErrorResponse) => {
                if ((data as ErrorResponse).message) {
                    setLastRequestError(data as ErrorResponse);
                    return;
                }
                setLastRequestError(null);
                setSearchResponse((data as SearchRepoResponse));
            });
    }, [searchedRepo, page, privateRepo, privateToken]);

    return (
        <div>
            { privateRepo ? undefined : <RepositorySearch/> }
            { lastRequestError ? <div>{ lastRequestError.message }</div> : undefined }
            {
                !searchResponse ? undefined : (
                    <>
                        <RepositoriesList items={ searchResponse.result.items }/>
                        {
                            privateRepo ? undefined : (
                                <Paginator
                                    searchedRepo={ searchedRepo }
                                    pagination={ searchResponse.pagination }/>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default RepositoriesView;
