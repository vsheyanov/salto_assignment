import { Action } from '../../interfaces';
import { SET_PRIVATE_TOKEN } from '../actions/action-types';

const initialState = '';

export default function (state = initialState, action: Action) {
    switch (action.type) {
        case SET_PRIVATE_TOKEN:
            return action.payload;
        default:
            return state;
    }
}