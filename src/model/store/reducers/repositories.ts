const initialState: Array<string> = [];

interface Action {
    type: string;
    payload: any;
}

export default function (state = initialState, action: Action ) {
    switch (action.type) {
        default:
            return state;
    }
}