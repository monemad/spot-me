import express from 'express';
import asyncHandler from 'express-async-handler';
import { setTokenCookie, restoreUser, requireAuth } from '../../utils/auth';
import db from '../../db/models'
import { DefScopeUser } from '../../db/models/user';

const router = express.Router();
const User = db.User;

router.get('/set-token-cookie', asyncHandler(async (req: any, res: any) => {
    const user: DefScopeUser = await User.findOne({
        where: {
            username: 'grimeboi'
        },
    })
    setTokenCookie(res, user);
    return res.json({ user });
}))

router.get('/restore-user', restoreUser, (req: any, res: any) => {
    return res.json(req.user);
})

router.get('/require-auth', requireAuth, (req: any, res: any) => {
    return res.json(req.user);
})

export default router;
