import { Action } from '../../interfaces';
import { SET_API_CALL_STATS } from '../actions/action-types';

const initialState = {
    success: true,
    time: 0,
    message: '',
};

export default function (state = initialState, action: Action) {
    switch (action.type) {
        case SET_API_CALL_STATS:
            return {
                ...state,
                success: action.payload.success,
                time: action.payload.time,
                message: action.payload.message,
            };
        default:
            return state;
    }
}