import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { Op } from 'sequelize';
import { validateFriend } from '../../utils/validation';

const router = express.Router();
const { Friend, User } = db;

router.post('/', validateFriend, asyncHandler(async (req: any, res: any) => {
    const { senderId, recipientId, confirmed } = req.body;
    const friend = await Friend.findOne({
        where: {
            [Op.or]: [
                {
                    senderId,
                    recipientId
                },
                {
                    senderId: recipientId,
                    recipientId: senderId
                }
            ]
        }
    })

    if (friend) return res.json({message: 'Friend already exists'})


    await Friend.create({
        senderId,
        recipientId,
        confirmed
    });

    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);
    res.json({sender, recipient});
}));

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const friend = await Friend.findByPk(id);

    friend.confirmed = true;
    await friend.save()

    const sender = await User.findByPk(friend.senderId);
    const recipient = await User.findByPk(friend.recipientId);
    res.json({sender, recipient});
}));

router.delete('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const friend = await Friend.findByPk(id);
    
    if (!friend) return res.json({message: 'Friend does not exist'})
    
    const { senderId, recipientId } = friend;
    await friend.destroy();

    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);
    res.json({sender,recipient});
}));

export default router;
