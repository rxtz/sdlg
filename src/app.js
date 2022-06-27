const express = require('express');

const compression = require('compression');
const helmet = require('helmet');

const router = require('./router');

const app = express();

app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ['*'],
    },
  })
);

app.use(router);

app.listen(process.env.PORT || 3000);

module.exports = app;
