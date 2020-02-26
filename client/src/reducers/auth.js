import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    LOADED_SUCCESS
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOADED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            };
        default:
            return state;
    }
};
