const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cityRouter = require('./cityrouter');

const app = express();

//middleware

app.use(bodyParser.json({ type: '*/*' }));

cityRouter(app);

if (process.env.NODE_ENV !== 'production') {
  console.log('Dev');

  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.dev.js');

  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..dist/index.html'));
  });
}

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log('Listening on port:', port));
