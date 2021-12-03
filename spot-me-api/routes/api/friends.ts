import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../../db/models';
import { Op } from 'sequelize';
import { validateFriend } from '../../utils/validation';

const router = express.Router();
const { Friend, User } = db;

router.post('/', validateFriend, asyncHandler(async (req: any, res: any) => {
    const { senderId, recipientId, confirmed } = req.body;
    const isFriend = await Friend.findOne({
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

    if (isFriend) return res.json({message: 'Friend already exists'})


    let friend = await Friend.create({
        senderId,
        recipientId,
        confirmed
    });

    friend = await Friend.findByPk(friend.id, {
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

    const friendData = friend.dataValues.recipient;

    friend.dataValues.firstName = friendData.firstName;
    friend.dataValues.lastName = friendData.lastName;
    friend.dataValues.username = friendData.username;
    friend.dataValues.imgUrl = friendData.imgUrl;
    friend.dataValues.otherId = friendData.id;
    delete friend.dataValues.sender;
    delete friend.dataValues.recipient;

    res.json(friend);
}));

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const friend = await Friend.findByPk(id, {
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

    friend.confirmed = true;
    await friend.save()

    const friendData = friend.dataValues.sender;

    friend.dataValues.firstName = friendData.firstName;
    friend.dataValues.lastName = friendData.lastName;
    friend.dataValues.username = friendData.username;
    friend.dataValues.imgUrl = friendData.imgUrl;
    friend.dataValues.otherId = friendData.id;
    delete friend.dataValues.sender;
    delete friend.dataValues.recipient;
    
    res.json(friend);
}));

router.delete('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const friend = await Friend.findByPk(id);
    
    if (!friend) return res.json({message: 'Friend does not exist'})
    await friend.destroy();
    
    res.json({message: "Successfully deleted"});
}));

export default router;
