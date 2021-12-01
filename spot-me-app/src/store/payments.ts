import { csrfFetch } from './csrf';
import rfdc from 'rfdc';
import { Payment, PaymentCreationData } from 'interfaces/payment';
import { Action } from 'interfaces/redux';
const clone = rfdc({ proto: false, circles: false })

const LOAD_PAYMENTS = 'session/loadPayments';
const ADD_PAYMENT = 'session/addPayment';
const REMOVE_PAYMENT = 'session/removePayment';

const loadPayments = (friends: Array<Payment>) => {
    return {
        type: LOAD_PAYMENTS,
        payload: friends,
    };
};

const addPayment = (friend: Payment) => {
    return {
        type: ADD_PAYMENT,
        payload: friend
    }
}

const removePayment = (id: number) => {
    return {
        type: REMOVE_PAYMENT,
        payload: id
    }
}

export const getPayments = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/users/${id}/payments/`);
    const payments = await response.json();
    dispatch(loadPayments(payments));
    return response;
};

export const createPayment = ({senderId, recipientId, amount, memo, fulfilled}: PaymentCreationData) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/payments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            senderId,
            recipientId,
            amount,
            memo,
            fulfilled
        }
    });

    if(response.ok) {
        const payment = await response.json();
        dispatch(addPayment(payment));
    }
}

export const confirmPayment = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/payments/${id}`, {
        method: 'PUT'
    })

    if (response.ok){
        const updatedPayment = await response.json();
        dispatch(addPayment(updatedPayment));
    }
}

export const deletePayment = (id: number) => async (dispatch: any) => {
    const response = await csrfFetch(`/api/payments/${id}`, {
        method: 'DELETE'
    })

    if (response.ok){
        dispatch(removePayment(id));
    }
}

const initialState = {};

const paymentsReducer = (state = initialState, action: Action) => {
    let newState = clone(state);
    switch (action.type) {
        case LOAD_PAYMENTS:
            action.payload.forEach((payment: Payment) => {
                newState[payment.id] = payment
            })
            return newState;
        case ADD_PAYMENT:
            newState[action.payload.id] = action.payload;
            return newState;
        case REMOVE_PAYMENT:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default paymentsReducer;
