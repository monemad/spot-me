import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { validatePayment } from '../../utils/validation';

const router = express.Router();
const { Payment, User } = db;

router.post('/', validatePayment, asyncHandler(async (req: any, res: any) => {
    const { senderId, recipientId, amount, memo, fulfilled } = req.body;

    await Payment.create({
        senderId,
        recipientId,
        amount,
        memo,
        fulfilled
    });

    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);
    res.json([sender, recipient]);
}));

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const payment = await Payment.findByPk(id);

    payment.fulfilled = true;
    await payment.save();

    const sender = await User.findByPk(payment.senderId);
    const recipient = await User.findByPk(payment.recipientId);
    res.json([sender, recipient]);
}));

export default router;
