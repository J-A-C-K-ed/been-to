/* eslint-disable no-console */
import express from 'express';
import path from 'path';

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const locationsRouter = require('./routes/locations');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('build'));

// serves index.html at root endpoint
app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
);

/* route handlers */

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/locations', locationsRouter);

/* catch all */

app.use('*', (req, res) => res.status(404).send('Oops! Wrong page!'));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global error handler */

app.use(
  (
    err: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction
  ) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'Internal Server Error' },
    };

    const errorObj = Object.assign(defaultErr, err);
    console.log('Error message from global err handler: ', errorObj.log);
    return res.status(errorObj.status).send(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`Getting serverd on port: ${PORT}`);
});

module.exports = app;
