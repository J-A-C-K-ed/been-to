// const express = require('express');
import express from 'express';
// const path = require('path');
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('client'));

// serves index.html at root endpoint
app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
);

// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
// });

/* catch all */

app.use('*', (req, res) => res.status(404).send('Oops! Wrong page!'));

// /* global error handler */

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'Internal Server Error' },
//   };

//   const errorObj = Object.assign(defaultErr, err);
//   console.log('Error message from global err handler: ', errorObj.log);
//   return res.status(errorObj.status).send(errorObj.message);
// });

app.listen(PORT, () => {
  console.log(`Getting J.A.C.K.ed on port: ${PORT}`);
});

module.exports = app;
