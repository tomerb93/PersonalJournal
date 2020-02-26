import { FETCH_ENTRIES } from '../actions/types';

const initialState = {
    entries: [],
    loading: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_ENTRIES:
            return {
                ...state,
                entries: payload,
                loading: false
            };
        default:
            return state;
    }
};
