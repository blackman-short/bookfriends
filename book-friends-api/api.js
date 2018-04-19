var express = require('express');
var app = express();
app.use('/static', express.static('public'));
app.use('/love', express.static('loveU'));
app.use('/love/yuhuirong', express.static('loveU/index.html'))
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(520, function () {
  console.log('Example app listening on port 520!');
})