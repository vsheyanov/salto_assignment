import { SET_API_CALL_STATS, SET_PRIVATE_TOKEN } from './action-types';
import store from '../store';


export const setApiCallStats = (success: boolean, time: number, message: string = '') => {
    store.dispatch({
        type: SET_API_CALL_STATS,
        payload: { success, time, message },
    });
};

export const setPrivateToken = (token: string) => {
    store.dispatch({
        type: SET_PRIVATE_TOKEN,
        payload: token,
    });
};
