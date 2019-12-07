
export interface SearchRepoResponse {
    incomplete_results: boolean;
    items: Array<RepositorySearchItem>;
    total_count: number;
}

export interface RepositorySearchItem {
    id: number;
    name: string;
    full_name: string;
    owner: {
        id: number;
        login: string;
    };
}

export interface RepositoryObject {
    id: number;
    name: string;
    full_name: string;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    open_issues_count: number;
    pushed_at: string;
    created_at: string;
    updated_at: string;
}

export interface ReadmeObject {
    download_url: string;
}

export interface ErrorResponse {
    message: string;
}

export interface Action {
    type: string;
    payload: any;
}
