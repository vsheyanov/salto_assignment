import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const useGetSearchRepo = () => {
    const locationSearch = queryString.parse(useLocation().search);
    const searchedRepo = String(locationSearch.repo || '');
    const page = parseInt(String(locationSearch.page), 10) || 1;
    const privateRepo = Boolean(locationSearch.private);
    return { searchedRepo, page, privateRepo };
};
