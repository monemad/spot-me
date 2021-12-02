import Stripe from 'stripe';
import fetch, { HeaderInit, RequestInit } from 'node-fetch';
import { stripeKey } from '../../config'

//@ts-ignore
const stripe = Stripe(stripeKey.secret);

const stripeFetch = async (url: string, method: string = 'GET', body: string = '') => {
    const headers: HeaderInit = {
        "Authorization": `Bearer ${stripeKey.secret}`,
    }
    if (method === 'POST') headers["Content-Type"] = "application/x-www-form-urlencoded"

    const options: RequestInit = {
        method,
        headers
    }
    if(body.length) options["body"] = body;

    return await fetch(url, options)
} 

export const getAvailableBalance = async () => {
    const response = await stripeFetch('https://api.stripe.com/v1/balance');

    if (response.ok){
        const balance = await response.json();
        return balance.available[0].amount;
    }
}

export const chargeUser = async (amount: number, description: string) => {
    const source = "tok_bypassPending";
    const currency = "usd";

    let body = ''
    body = body.concat(`amount=${amount * 100}`);
    body = body.concat(`&description=${description}`);
    body = body.concat(`&source=${source}`);
    body = body.concat(`&currency=${currency}`);

    const response = await stripeFetch('https://api.stripe.com/v1/charges', 'POST', body)
    if (response.ok) {
        const charge = await response.json()
        return `${charge.id}: ${charge.description}`;
    } else {
        console.error(await response.json())
    }
}

export const payoutUser = async (amount: number, description: string) => {
    const currency = "usd";

    let body = ''
    body = body.concat(`amount=${amount * 100}`);
    body = body.concat(`&description=${description}`);
    body = body.concat(`&currency=${currency}`);

    const response = await stripeFetch('https://api.stripe.com/v1/payouts', 'POST', body)
    if (response.ok) {
        const payout = await response.json()
        return `${payout.id}: ${payout.description}`;
    } else {
        console.error(await response.json())
    }
}

export default stripe;
