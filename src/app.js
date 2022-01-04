const bodyParser = require('body-parser');
const express = require('express');

const slackRouter = require('./routes/slackRouter.js');

const app = express();

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8');
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.use('/slack', slackRouter);

module.exports = app;
