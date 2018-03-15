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

app.listen(port, () => console.log(`Up and running on port ${port}`));
