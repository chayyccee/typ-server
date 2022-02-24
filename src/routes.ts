import { Express, Request, Response } from 'express';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

const routes = (app: Express ) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post('/api/users', validate(createUserSchema), createUserHandler);
    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler); // to login
    app.get('/api/sessions', requireUser, getUserSessionHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.post('api/products', [requireUser, validate(createProductSchema)], createProductHandler);
    app.put('api/products', [requireUser, validate(updateProductSchema)], updateProductHandler);
    app.get('api/products', [requireUser, validate(getProductSchema)], getProductHandler);
    app.delete('api/products', [requireUser, validate(deleteProductSchema)], deleteProductHandler);
};

export default routes;