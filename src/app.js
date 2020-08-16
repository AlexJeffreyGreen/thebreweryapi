const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
require('./api/routes/manufacturer.routes.js')(app);
require('./api/routes/yeast.roPutes.js')(app);
require('./api/routes/grain.routes.js')(app);
require('./api/routes/hops.routes.js')(app);
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{
useNewUrlParser: true,
useUnifiedTopology: true
}).then(()=>{
console.log("successfully connected to the database.");
}).catch(err=>{
  console.log("error with the connection", err);
  process.exit();
});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

//app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
