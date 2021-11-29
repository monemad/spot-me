import express from 'express';
import asyncHandler from 'express-async-handler';
import { setTokenCookie } from '../../utils/auth';
import db from '../../db/models';
import { validateSignup } from '../../utils/validation';

const router = express.Router();
const User = db.User;

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

router.get('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const user = await User.findByPk(id);
    return res.json(user);
}));

router.put('/:id/', asyncHandler(async (req: any, res: any) => {
    const id: number = +req.params.id;
    const { firstName, lastName, username, email, balance } = req.body;
    const user = await User.findByPk(id);
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.balance = balance;
    await user.save();
    return res.json(user);
}))

export default router;
