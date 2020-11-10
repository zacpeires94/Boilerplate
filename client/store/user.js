import axios from 'axios';
import history from '../history';

const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

const getUser = user => ({
    type: GET_USER,
    user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

export const createUser = userDetails => {
    return async dispatch => {
        const { data } = await axios.post('/api/users/signup', userDetails);
        dispatch(getUser(data));
    }
}

export const me = () => {
    return async dispatch => {
        const { data } = await axios.get('/api/users/me');
        dispatch(getUser(data) || defaultUser);
    }
}

export const login = userData => {
    return async dispatch => {
        const { data } = await axios.put('/api/users/login', userData);
        dispatch(getUser(data));
        history.push('/');
    }
}

export const logout = () => {
    return async dispatch => {
        const { data } = await axios.delete|('/api/users/logout');
        dispatch(removeUser);
    }
}


export default (state = defaultUser, action) => {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state;
    }
}