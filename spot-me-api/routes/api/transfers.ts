import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { validateTransfer } from '../../utils/validation';

const router = express.Router();
const { Transfer, User } = db;

router.post('/', validateTransfer, asyncHandler(async (req: any, res: any) => {
    const { userId, amount, deposit } = req.body;

    await Transfer.create({
        userId,
        amount,
        deposit
    });

    const user = await User.findByPk(userId);
    res.json(user);
}));

export default router;
