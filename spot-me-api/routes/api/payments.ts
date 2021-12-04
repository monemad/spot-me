import express, { response } from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { validatePayment } from '../../utils/validation';

const router = express.Router();
const { Payment, User } = db;

router.post('/', validatePayment, asyncHandler(async (req: any, res: any) => {
    const { senderId, recipientId, amount, memo, fulfilled } = req.body;

    const sender = await User.scope('currentUser').findByPk(senderId);
    if (+sender.balance < +amount) {
        return res.status(400).json({error: 'Insufficient funds'})
    }

    let payment = await Payment.create({
        senderId,
        recipientId,
        amount,
        memo,
        fulfilled
    });

    if (fulfilled) {
        const recipient = await User.scope('currentUser').findByPk(recipientId);
        sender.balance= +sender.balance - +amount;
        recipient.balance= +recipient.balance + +amount;
        await sender.save();
        await recipient.save();
    }

    payment = await Payment.findByPk(payment.id, {
        include: [
            {
                model: User,
                as: "sender"
            },
            {
                model: User,
                as: "recipient"
            }
        ]
    })

    const isSender: boolean = fulfilled;
    const paymentData = isSender ? payment.dataValues.recipient : payment.dataValues.sender;

    payment.dataValues.firstName = paymentData.firstName;
    payment.dataValues.lastName = paymentData.lastName;
    payment.dataValues.username = paymentData.username;
    payment.dataValues.imgUrl = paymentData.imgUrl;
    payment.dataValues.otherId = paymentData.id;
    delete payment.dataValues.sender;
    delete payment.dataValues.recipient;

    res.json(payment);
}));

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    
    const payment = await Payment.findByPk(id, {
        include: [
            {
                model: User,
                as: "sender"
            },
            {
                model: User,
                as: "recipient"
            }
        ]
    });
    const sender = await User.scope('currentUser').findByPk(payment.senderId);
    if (+sender.balance < +payment.amount) {
        return res.status(400).json({error: 'Insufficient funds'})
    }

    payment.fulfilled = true;
    await payment.save();

    const recipient = await User.scope('currentUser').findByPk(payment.recipientId);
    sender.balance= +sender.balance - +payment.amount;
    recipient.balance= +recipient.balance + +payment.amount;
    await sender.save();
    await recipient.save();

    const paymentData = payment.dataValues.recipient;

    payment.dataValues.firstName = paymentData.firstName;
    payment.dataValues.lastName = paymentData.lastName;
    payment.dataValues.username = paymentData.username;
    payment.dataValues.imgUrl = paymentData.imgUrl;
    payment.dataValues.otherId = paymentData.id;
    delete payment.dataValues.sender;
    delete payment.dataValues.recipient;
        
    res.json(payment);
}));

router.delete('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    
    const payment = await Payment.findByPk(id);
    if (payment.fulfilled) return res.json({message: "Cannot delete a fulfilled Spot"}, 401);

    await payment.destroy();
    res.json({message: "Successfully deleted"});
}));

export default router;
