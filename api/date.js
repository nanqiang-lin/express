const express = require('express');
const helmet = require('helmet');
const moment = require('moment');
const axios = require('axios');

const CLIENT_ID = '';
const CLIENT_SECRET = '';

const app = express();

app.use(helmet());

app.post('/oauth', async function (ctx, next) {
  const { clientID = CLIENT_ID, clientSecret = CLIENT_SECRET, code } = ctx.request.body
  const { status, data } = await axios({
    method: 'post',
    url: 'http://github.com/login/oauth/access_token?' +
    `client_id=${clientID}&` +
    `client_secret=${clientSecret}&` +
    `code=${code}`,
    headers: {
      accept: 'application/json'
    }
  }).catch(e => e.response)
  ctx.body = { status, data }
})

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  res.status(200).send(currentTime);
});

module.exports = app;
