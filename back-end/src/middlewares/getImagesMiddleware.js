const path = require('path');

const dirname = path.join('..', 'assets', 'images', 'public');

const getImagesMiddleware = (req, res, next) => {
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
};

module.exports = {
  getImagesMiddleware,
  dirname,
};