const express = require('express');
const cors = require('cors');
const path = require('path');
// const staticZip = require('express-static-zip');
const Routes = require('../routes');
const errorHandler = require('../middlewares/error.handler');

const app = express();

app.use(cors());
// const tset = '../../../assets/images';

const dirname = path.join('..', 'assets', 'images', 'public');

// app.use(staticZip(`${dirname}/images.zip`, {
//   zipRoot: 'public/', // Use a directory inside ZIP file as
// }));

app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(Routes);

app.use('/images', express.static(`${dirname}`), (req, res, next) => {
  const options = {
      root: path.join(dirname),
  };
   
  const fileName = 'images.zip';
  res.sendFile(fileName, options, (err) => {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
          next();
      }
  }); 
});

app.use(errorHandler);

module.exports = app;
