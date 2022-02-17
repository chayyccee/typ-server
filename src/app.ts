import express from 'express';
import config from 'config';
import connect from './utils/connect';
import loggerInstance from './utils/logger';

const port = config.get<number>('server_port');

const app = express();

app.listen(port, async () => {
    loggerInstance.info(`Server started on port ${port}`);

    await connect();
    });
