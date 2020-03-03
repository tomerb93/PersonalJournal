import { FETCH_ENTRIES } from './types';
import axios from 'axios';

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
