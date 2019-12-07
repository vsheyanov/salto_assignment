import { SHOW_REPOSITORY } from '../actions/action-types';

const initialState: string | null = null;

interface Action {
    type: string;
    payload: any;
}

export default function (state = initialState, action: Action) {
    switch (action.type) {
        case SHOW_REPOSITORY:
            return action.payload;
        default:
            return state;
    }
}