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

export default router;
