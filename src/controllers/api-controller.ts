import { SearchRepoResponse, RepositoryObject, ErrorResponse } from '../model/interfaces';

class ApiController {

    searchRepos(repo: string) : Promise<SearchRepoResponse | ErrorResponse> {
        return this._callApi(`/search/repositories?q=${encodeURI(repo)}+in:name`);
    }

    getRepository(owner: string, repo: string) : Promise<RepositoryObject | ErrorResponse> {
        return this._callApi(`/repos/${owner}/${repo}`);
    }

    getUser(userName: string) {
        return this._callApi(`/users/${userName}`);
    }

    _callApi(path: string) : Promise<any> {
        const url = `https://api.github.com${path}`;
        return fetch(url, { method: 'GET' })
            .then((r: any) => r.json())
            .catch(error => {
                return error;
            });
    }

}

export default new ApiController();