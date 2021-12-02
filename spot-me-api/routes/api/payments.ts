import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { validatePayment } from '../../utils/validation';

const router = express.Router();
const { Payment, User } = db;

router.post('/', validatePayment, asyncHandler(async (req: any, res: any) => {
    const { senderId, recipientId, amount, memo, fulfilled } = req.body;

    const payment = await Payment.create({
        senderId,
        recipientId,
        amount,
        memo,
        fulfilled
    });

    if (fulfilled) {
        const sender = await User.scope('currentUser').findByPk(senderId);
        const recipient = await User.scope('currentUser').findByPk(recipientId);
        sender.balance= +sender.balance - +amount;
        recipient.balance= +recipient.balance + +amount;
        await sender.save();
        await recipient.save();
    }

    res.json(payment);
}));

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const payment = await Payment.findByPk(id);

    payment.fulfilled = true;
    await payment.save();

    const sender = await User.scope('currentUser').findByPk(payment.senderId);
    const recipient = await User.scope('currentUser').findByPk(payment.recipientId);
    sender.balance= +sender.balance - +payment.amount;
    recipient.balance= +recipient.balance + +payment.amount;
    await sender.save();
    await recipient.save();
        
    res.json(payment);
}));

export default router;
