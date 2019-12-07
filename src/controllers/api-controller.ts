import { SearchRepoResponse, RepositoryObject, ErrorResponse, ReadmeObject } from '../model/interfaces';
import { setApiCallStats } from '../model/store/actions/actions';

class ApiController {

    searchRepos(repo: string) : Promise<SearchRepoResponse | ErrorResponse> {
        return this._callApi(`/search/repositories?q=${encodeURI(repo)}+in:name`);
    }

    getRepository(owner: string, repo: string) : Promise<RepositoryObject | ErrorResponse> {
        return this._callApi(`/repos/${owner}/${repo}`);
    }

    getRepositoryReadme(owner: string, repo: string) : Promise<string> {
        return this._callApi(`/repos/${owner}/${repo}/readme`)
            .then((response: ReadmeObject) => {
                return fetch(response.download_url).then(r => r.text()).catch(() => '');
            })
            .catch(() => '');
    }

    getUser(userName: string) {
        return this._callApi(`/users/${userName}`);
    }

    _callApi(path: string) : Promise<any> {
        const now = Date.now();
        const url = `https://api.github.com${path}`;
        return fetch(url, { method: 'GET' })
            .then((r: any) => r.json())
            .then((response: any) => {
                setApiCallStats(true, Date.now() - now);
                return response;
            })
            .catch(error => {
                setApiCallStats(false, Date.now() - now);
                return error;
            });
    }

}

export default new ApiController();