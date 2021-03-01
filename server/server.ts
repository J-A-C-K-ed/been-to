const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('client'));

// serves index.html at root endpoint
app.get('/', (req: any, res: { status: (arg0: number) => { (): any; new(): any; sendFile: { (arg0: any): any; new(): any; }; }; }) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));

/* catch all */

// app.use('*', (req, res) => {
//   return res.status(404).send('Oops! Wrong page!');
// });

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
