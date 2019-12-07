import { SearchRepoResponse, RepositoryObject, ErrorResponse, ReadmeObject } from '../model/interfaces';
import { setApiCallStats } from '../model/store/actions/actions';

class ApiController {

    searchRepos(repo: string, page?: number) : Promise<SearchRepoResponse | ErrorResponse> {
        return this._callApi(`/search/repositories?per_page=20&page=${page || 1}&q=${encodeURI(repo)}+in:name`);
    }

    getRepository(owner: string, repo: string) : Promise<RepositoryObject | ErrorResponse> {
        return this._callApi(`/repos/${owner}/${repo}`);
    }

    getRepositoryReadme(owner: string, repo: string) : Promise<string> {
        return this._callApi(`/repos/${owner}/${repo}/readme`)
            .then((response: ReadmeObject | ErrorResponse) => {
                if ((response as ErrorResponse).message) {
                    return '';
                }
                return fetch((response as ReadmeObject).download_url).then(r => r.text()).catch(() => '');
            })
            .catch(() => '');
    }

    getUser(userName: string) {
        return this._callApi(`/users/${userName}`);
    }

    _callApi(path: string) : Promise<any> {
        const now = Date.now();
        const url = `https://api.github.com${path}`;
        return fetch(url)
            .then(async (r: any) => {
                const requestPagination = r.headers.get('Link');
                const paginationOptions: { [key: string]: number } = {};
                if (requestPagination) {
                    const links = requestPagination.split(',');
                    links.forEach((link: string) => {
                        let [url, rel] = link.split(';');
                        if (!url || !rel) { return; }
                        const urlMatch = url.match(/&page\=(\d+)/);
                        const relMatch = rel.match('"(.*)"');
                        if (!urlMatch || !relMatch) { return; }
                        paginationOptions[relMatch[1]] = parseInt(urlMatch[1], 10);
                    });
                }
                const result = await r.json();
                return {
                    ...result,
                    pagination: paginationOptions,
                }
            })
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