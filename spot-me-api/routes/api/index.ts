import express from 'express';
import asyncHandler from 'express-async-handler';
import { setTokenCookie } from '../../utils/auth';
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

export default router;
