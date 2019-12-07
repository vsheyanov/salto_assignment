import { SHOW_REPOSITORY } from './action-types';
import store from '../store';

export const showRepository = (repositoryId: string) => {
    store.dispatch({
        type: SHOW_REPOSITORY,
        payload: repositoryId,
    });
};