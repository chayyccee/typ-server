import { Request, Response } from 'express';
import config from 'config';
import { createSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';
import loggerInstance from '../utils/logger';

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // validate the user's password
    const user = await validatePassword(req.body);

    if(!user) {
        return res.status(401).send('Invalid password');
    }

    // create a new session for the user
    const session = await createSession(user._id, req.get('user-agent') || '');

    // create an access token for the user
    const accessToken = signJwt({
        ...user,
        session: session._id,
    },
    {
        expiresIn: config.get('accessTokenTtl'),
    })

    // create a refresh token for the user
    const refreshToken = signJwt({
        ...user,
        session: session._id,
    },
    {
        expiresIn: config.get('accessTokenTtl'),
    })

    // send the access token and refresh token to the client
    return res.status(200).send({
        accessToken,
        refreshToken,
    });
}