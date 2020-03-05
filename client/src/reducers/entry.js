import {
    FETCH_ENTRIES,
    ENTRY_POST_SUCCESS,
    ENTRY_POST_FAIL,
    ENTRY_DEL_SUCCESS,
    ENTRY_DEL_FAIL
} from '../actions/types';

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
        case ENTRY_POST_SUCCESS:
        case ENTRY_POST_FAIL:
        case ENTRY_DEL_SUCCESS:
        case ENTRY_DEL_FAIL:
        default:
            return state;
    }
};
