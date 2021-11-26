import jwt from 'jsonwebtoken';
import db from '../db/models';
import { DefScopeUser } from '../db/models/user';
import { RequestError } from '../app';

const User: any = db.User;

interface JWTConfig {
    secret: string;
    expiresIn: string;
}

const { jwtConfig } = require('../config');
const { secret, expiresIn }: JWTConfig = jwtConfig;

export const setTokenCookie = (res: any, user: DefScopeUser) => {
    const token: string = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );
    
    const isProduction: boolean = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
        maxAge: +expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    })

    return token;
}

interface Cookies {
    token: string
}

export const restoreUser= (req: any, res: any, next: any) => {
    const { token }: Cookies = req.cookies;

    return jwt.verify(token, secret, async (err, jwtPayload: any) => {
        if (err)
            return next()

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch(e) {
            res.clearCookie('token');
            return next()
        }

        if (!req.user) res.clearCookie('token');

        return next();
    })
}

export const requireAuth = [
    restoreUser,
    function (req: any, res: any, next: any) {
        if (req.user) return next();

        const err = new RequestError('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
]
