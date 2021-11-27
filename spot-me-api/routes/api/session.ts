import express from 'express';
import asyncHandler from 'express-async-handler';
import { RequestError } from '../../app';
import { setTokenCookie, restoreUser } from '../../utils/auth';
import db from '../../db/models'

const router = express.Router();
const User = db.User;

router.post('/', asyncHandler(async (req: any, res: any, next: any) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new RequestError('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.']
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
}))

router.delete('/', (_req: any, res: any) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
})

export default router;
