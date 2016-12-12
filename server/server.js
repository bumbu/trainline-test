const path = require('path')
const Express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const fs = require('fs')
const webpackConfig = require('../webpack.config')

const config = {
  HOST: 'http://localhost',
  PORT: 3000,
}

const app = new Express();
const port = 3000;

// Middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));

app.use('/public', Express.static('public'));

// This is fired every time the server side receives a request
app.use(function handleRender(req, res) {
  return res.send(fs.readFileSync('public/index.html', 'utf-8'))
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
})
