import {
    SearchRepoResponse,
    RepositoryObject,
    ErrorResponse,
    ReadmeObject,
    RepositorySearchItem, Pagination
} from '../model/interfaces';
import { setApiCallStats } from '../model/store/actions/actions';

class ApiController {

    searchRepos(repo: string, page?: number) : Promise<SearchRepoResponse | ErrorResponse> {
        return this._callApi(`/search/repositories?per_page=20&page=${page || 1}&q=${encodeURI(repo)}+in:name`);
    }

    getUserRepos(token: string, page?: number) : Promise<SearchRepoResponse | ErrorResponse> {
        return this._callApi(`/user/repos?per_page=20&page=${page || 1}`, token)
            .then((response: { result: Array<RepositorySearchItem>, pagination: Pagination } | ErrorResponse) => {
                if ((response as ErrorResponse).message) {
                    return (response as ErrorResponse);
                }

                const { result, pagination } = (response as { result: Array<RepositorySearchItem>, pagination: Pagination });
                const privateRepos = result.filter(r => r.private);

                return {
                    result: { items: privateRepos },
                    pagination,
                };
            });
    }

    getRepository(owner: string, repo: string, token: string = '') : Promise<RepositoryObject | ErrorResponse> {
        return this._callApi(`/repos/${owner}/${repo}`, token);
    }

    getRepositoryReadme(owner: string, repo: string, token: string = '') : Promise<string> {
        return this._callApi(`/repos/${owner}/${repo}/readme`, token)
            .then((response: ReadmeObject | ErrorResponse) => {
                if ((response as ErrorResponse).message) {
                    return '';
                }
                return fetch((response as ReadmeObject).result.download_url).then(r => r.text()).catch(() => '');
            })
            .catch(() => '');
    }

    _callApi(path: string, privateToken: string = '') : Promise<any> {
        const now = Date.now();
        const url = `https://api.github.com${path}`;

        const options = privateToken && privateToken.trim() !== '' ? {
            headers: {
                'Authorization': `token ${privateToken}`,
            },
        } : {};

        return fetch(url, options)
            .then(async (r: any) => {
                const requestPagination = r.headers.get('Link');
                const paginationOptions: { [key: string]: number } = {};
                if (requestPagination) {
                    const links = requestPagination.split(',');
                    links.forEach((link: string) => {
                        let [url, rel] = link.split(';');
                        if (!url || !rel) { return; }
                        const urlMatch = url.match(/&page=(\d+)/);
                        const relMatch = rel.match('"(.*)"');
                        if (!urlMatch || !relMatch) { return; }
                        paginationOptions[relMatch[1]] = parseInt(urlMatch[1], 10);
                    });
                }
                const result = await r.json();

                if (!r.ok) {
                    return Promise.reject(result);
                }

                return {
                    result,
                    pagination: paginationOptions,
                }
            })
            .then((response: any) => {
                setApiCallStats(true, Date.now() - now);
                return response;
            })
            .catch((error: any) => {
                setApiCallStats(false, Date.now() - now, error.message);
                return error;
            });
    }

}

export default new ApiController();