import express from 'express';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { setTokenCookie } from '../../utils/auth';
import db from '../../db/models';
import { validateSignup } from '../../utils/validation';

const router = express.Router();
const { User, Friend, Payment, Transfer } = db;

router.post('/', validateSignup, asyncHandler(async (req: any, res: any) => {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, username, email, password });

    await setTokenCookie(res, user);

    return res.json({ user });
}));

router.get('/', asyncHandler(async (req: any, res: any) => {
    const users = await User.findAll({
        include: db.Friend
    })
    return res.json( users );
}));

router.get('/search/:query', asyncHandler(async (req: any, res:any) => {
    const query: string = req.params.query;
    const queries = query.split(" ")
    let allResults: Array<any> = []
    for (let i = 0; i < queries.length; i++) {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {firstName: {[Op.iRegexp]:`.*${queries[i]}.*`}},
                    {lastName: {[Op.iRegexp]:`.*${queries[i]}.*`}},
                    {username: {[Op.iRegexp]:`.*${queries[i]}.*`}}
                ]
            }
        });
        allResults = allResults.concat(users);
    }
    return res.json(allResults);
}))

router.get('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const user = await User.findByPk(id);
    return res.json(user);
}));

router.get('/:id/friends/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const friends = await Friend.findAll({
        where: {
            [Op.or]: [
                {recipientId: id},
                {senderId: id}
            ]
        },
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

    friends.forEach((friend: any) => {
        const isSender: boolean = id === friend.dataValues.senderId;
        const friendData = isSender ? friend.dataValues.recipient : friend.dataValues.sender;

        friend.dataValues.firstName = friendData.firstName;
        friend.dataValues.lastName = friendData.lastName;
        friend.dataValues.username = friendData.username;
        friend.dataValues.imgUrl = friendData.imgUrl;
        friend.dataValues.otherId = friendData.id;
        delete friend.dataValues.sender;
        delete friend.dataValues.recipient;
    })
    
    return res.json(friends);
}));

router.get('/:id/payments/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const payments = await Payment.findAll({
        where: {
            [Op.or]: [
                {recipientId: id},
                {senderId: id}
            ]
        },
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

    payments.forEach((payment: any) => {
        const isSender: boolean = id === payment.dataValues.senderId;
        const paymentData = isSender ? payment.dataValues.recipient : payment.dataValues.sender;

        payment.dataValues.firstName = paymentData.firstName;
        payment.dataValues.lastName = paymentData.lastName;
        payment.dataValues.username = paymentData.username;
        payment.dataValues.imgUrl = paymentData.imgUrl;
        payment.dataValues.otherId = paymentData.id;
        delete payment.dataValues.sender;
        delete payment.dataValues.recipient;
    })

    return res.json(payments);
}))

router.get('/:id/transfers/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const transfers = await Transfer.findAll({
        where: {
            userId: id
        }
    })

    return res.json(transfers);
}))

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const { firstName, lastName, username, email } = req.body;
    const user = await User.findByPk(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    await user.save();
    return res.json(user);
}))

export default router;
