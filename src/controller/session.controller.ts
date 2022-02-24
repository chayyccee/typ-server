import { Request, Response } from 'express';
import config from 'config';
import { createSession, findSessions, updateSession } from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // validate the user's password
    const user = await validatePassword(req.body);

    if(!user) {
        return res.status(401).send('Invalid e-mail or password');
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
        expiresIn: config.get('refreshTokenTtl'),
    })

    // send the access token and refresh token to the client
    return res.status(200).send({
        accessToken,
        refreshToken,
    });
}

export const getUserSessionHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    const sessions = await findSessions({user: userId, valid: true});
    return res.send(sessions);
}

export const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session;

    await updateSession({_id: sessionId}, {valid: false});

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}