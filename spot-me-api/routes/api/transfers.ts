import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { validateTransfer } from '../../utils/validation';
import { chargeUser, payoutUser, getAvailableBalance } from './stripe';

const router = express.Router();
const { Transfer, User } = db;

router.post('/', validateTransfer, asyncHandler(async (req: any, res: any) => {
    const { userId, amount, deposit } = req.body;

    const user = await User.scope('currentUser').findByPk(+userId);
    if (!deposit && (+user.balance < +amount || +(await getAvailableBalance()) < +amount) )
        return res.status(400).json({error: "Insufficient funds"})

    const stripeConf = deposit ? 
        await chargeUser(amount, `Deposit to account #${userId}`)
        :
        await payoutUser(amount, `Withdrawal from account #${userId}`)

    const transfer = await Transfer.create({
        userId,
        amount,
        deposit,
        stripeConf
    });

    
    user.balance = deposit ? +user.balance + +amount : +user.balance - +amount;
    await user.save();
    res.json(transfer);
}));

export default router;
