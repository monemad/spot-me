import { csrfFetch } from './csrf';
import rfdc from 'rfdc';
import { Transfer, TransferCreationData } from 'interfaces/transfer'
import { Action } from 'interfaces/redux';
const clone = rfdc({ proto: false, circles: false })

const LOAD_TRANSFERS = 'session/loadTransfers';
const ADD_TRANSFER = 'session/addTransfer';

const loadTransfers = (transfers: Array<Transfer>) => {
    return {
        type: LOAD_TRANSFERS,
        payload: transfers,
    };
};

const addTransfer = (friend: Transfer) => {
    return {
        type: ADD_TRANSFER,
        payload: friend
    }
}

export const getTransfers = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/users/${id}/transfers/`);
    const transfers = await response.json();
    dispatch(loadTransfers(transfers));
    return id;
};

export const createTransfer = ({ userId, amount, deposit }: TransferCreationData) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/transfers/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            amount,
            deposit
        })
    });

    if(response.ok) {
        const transfer = await response.json();
        dispatch(addTransfer(transfer));
    }
}

const initialState = {};

const transfersReducer = (state = initialState, action: Action) => {
    let newState = clone(state);
    switch (action.type) {
        case LOAD_TRANSFERS:
            action.payload.forEach((transfer: Transfer) => {
                newState[transfer.id] = transfer
            })
            return newState;
        case ADD_TRANSFER:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default transfersReducer;
