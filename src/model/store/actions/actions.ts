import { SHOW_REPOSITORY, SET_API_CALL_STATS } from './action-types';
import store from '../store';

export const showRepository = (repositoryId: string) => {
    store.dispatch({
        type: SHOW_REPOSITORY,
        payload: repositoryId,
    });
};


export const setApiCallStats = (success: boolean, time: number) => {
    store.dispatch({
        type: SET_API_CALL_STATS,
        payload: { success, time },
    });
};