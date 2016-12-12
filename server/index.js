const Express = require('express')
const fs = require('fs')

const app = new Express();
const port = 3000;

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
