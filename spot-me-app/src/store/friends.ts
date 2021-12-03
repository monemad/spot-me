import { csrfFetch } from './csrf';
import rfdc from 'rfdc';
import { Action } from 'interfaces/redux';
import { Friend, FriendCreationData } from 'interfaces/friend';
const clone = rfdc({ proto: false, circles: false })

const LOAD_FRIENDS = 'session/loadFriends';
const ADD_FRIEND = 'session/addFriend';
const REMOVE_FRIEND = 'session/removeFriend';

const loadFriends = (friends: Array<Friend>) => {
    return {
        type: LOAD_FRIENDS,
        payload: friends,
    };
};

const addFriend = (friend: Friend) => {
    return {
        type: ADD_FRIEND,
        payload: friend
    }
}

const removeFriend = (id: number) => {
    return {
        type: REMOVE_FRIEND,
        payload: id
    }
}

export const getFriends = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/users/${id}/friends/`);
    const friends = await response.json();
    dispatch(loadFriends(friends));
    return id;
};

export const createFriend = ({senderId, recipientId, confirmed}: FriendCreationData) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/friends/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            senderId,
            recipientId,
            confirmed
        }
    });

    if(response.ok) {
        const friend = await response.json();
        dispatch(addFriend(friend));
    }
}

export const confirmFriend = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/friends/${id}`, {
        method: 'PUT'
    })

    if (response.ok){
        const updatedFriend = await response.json();
        dispatch(addFriend(updatedFriend));
    }
}

export const deleteFriend = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/friends/${id}`, {
        method: 'DELETE'
    })

    if (response.ok){
        dispatch(removeFriend(id));
    }
}

const initialState = {};

const friendsReducer = (state = initialState, action: Action) => {
    let newState = clone(state);
    switch (action.type) {
        case LOAD_FRIENDS:
            action.payload.forEach((friend: Friend) => {
                newState[friend.id] = friend
            })
            return newState;
        case ADD_FRIEND:
            newState[action.payload.id] = action.payload;
            return newState;
        case REMOVE_FRIEND:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default friendsReducer;
