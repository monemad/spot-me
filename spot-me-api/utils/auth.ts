import jwt from 'jsonwebtoken';
import { User } from '../db/models';
import { DefScopeUser} from '../db/models/user'

interface JWTConfig {
    secret: string;
    expiresIn: string;
}

const { jwtConfig } = require('../config');
const { secret, expiresIn }: JWTConfig = jwtConfig;

const setTokenCookie = (res: any, user: DefScopeUser) => {
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

const restoreUser= (req: any, res: any, next: any) => {
    const { token }: Cookies  = req.cookies;

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
