const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = require('./config/router');
const { dbURI, port } = require('./config/environment');


app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);

//create global error catcher
app.use((err, req, res, next) => {
  //mongoose sends back a err with message in it
  if(err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Unprocessable Entity'});
  }
  res.status(500).json({message: 'Internal server error'});
  next();
});

app.listen(port, () => console.log(`Up and running on port ${port}`));
