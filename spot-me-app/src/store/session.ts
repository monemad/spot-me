import { csrfFetch } from './csrf';
import { SessionUser, LoginCredentials, SignupFormData } from 'interfaces/user';
import { Action } from 'interfaces/redux';
import rfdc from 'rfdc';
const clone = rfdc({ proto: false, circles: false })

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user: SessionUser) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const login = (user: LoginCredentials) => async (dispatch: any) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
        credential,
        password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async (dispatch: any) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return data.user;
};

export const signup = (user: SignupFormData) => async (dispatch: any) => {
    const { firstName, lastName, username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch: any) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action: Action) => {
    let newState = clone(state);
    switch (action.type) {
        case SET_USER:
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
