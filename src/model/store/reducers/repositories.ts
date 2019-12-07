import { Action } from '../../interfaces';

const initialState: Array<string> = [];

export default function (state = initialState, action: Action ) {
    switch (action.type) {
        default:
            return state;
    }
}