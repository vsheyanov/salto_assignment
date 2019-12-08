export interface Pagination {
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
}

export interface SearchRepoResponse {
    pagination: Pagination;
    result: {
        items: Array<RepositorySearchItem>;
    }
}

export interface RepositorySearchItem {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        id: number;
        login: string;
    };
}

export interface RepositoryObject {
    result: {
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
}

export interface ReadmeObject {
    result: { download_url: string; };
}

export interface ErrorResponse {
    message: string;
}

export interface Action {
    type: string;
    payload: any;
}
