import {
    FETCH_ENTRIES,
    ENTRY_POST_SUCCESS,
    ENTRY_POST_FAIL,
    ENTRY_DEL_SUCCESS,
    ENTRY_DEL_FAIL
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

const baseUrl = 'http://localhost:5000/api/entries';

// Get entries
export const getEntries = () => async dispatch => {
    try {
        const res = await axios.get(baseUrl);
        console.log(res.data);
        dispatch({
            type: FETCH_ENTRIES,
            payload: res.data
        });
    } catch (error) {
        console.error(error.message);
    }
};

// Post an entry
export const postEntry = ({ title, content }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ title, content });

    try {
        const res = await axios.post(baseUrl, body, config);

        dispatch(setAlert(res.data.msg, 'success'));

        dispatch({
            type: ENTRY_POST_SUCCESS
        });
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ENTRY_POST_FAIL
        });
    }
};

// Delete an entry
export const deleteEntry = entryId => async dispatch => {
    try {
        const res = await axios.delete(`${baseUrl}/${entryId}`);

        console.log(res.data.msg);

        dispatch({
            type: ENTRY_DEL_SUCCESS
        });

        dispatch(setAlert(res.data.msg, 'success'));

        dispatch(getEntries());
    } catch (error) {
        console.error(error.message);

        dispatch({
            type: ENTRY_DEL_FAIL
        });
    }
};
