import { csrfFetch } from './csrf';
import { CurScopeUser, LoginCredentials } from 'interfaces/user';
import { Action } from 'interfaces/redux';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user: CurScopeUser) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

// const removeUser = () => {
//     return {
//         type: REMOVE_USER,
//     };
// };

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

const initialState = { user: null };

const sessionReducer = (state = initialState, action: Action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
        case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
        default:
        return state;
    }
};

export default sessionReducer;