import express from 'express';
import config from 'config';
import deserializeUser from './middleware/deserializeUser';
import connect from './utils/connect';
import loggerInstance from './utils/logger';
import routes from './routes';

const port = config.get<number>('server_port');

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
    loggerInstance.info(`Server started on port ${port}`);

    await connect();

    routes(app);
    });
