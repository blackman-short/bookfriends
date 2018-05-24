var express = require('express');
var app = express();
app.use('/static', express.static('public'));
app.use('/love', express.static('loveU'));
app.use('/love/yuhuirong', express.static('loveU/index.html'))
app.use('/test/image', express.static('loveU/images/small.gif'))
app.use('/download/image', express.static('download/small.gif')) // test
app.use('/download/android',express.static('download/android.apk')) // download android package.
app.use('/download/ios',express.static('download/ios.ipa')) // download ios package.
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(520, function () {
  console.log('Example app listening on port 520!');
})