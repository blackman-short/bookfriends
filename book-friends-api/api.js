var express = require('express');
var app = express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'XDF')))
app.use('/static', express.static('public'));
app.use('/love', express.static('loveU'));
app.use('/love/yuhuirong', express.static('loveU/index.html'))
app.use('/test/image', express.static('loveU/images/small.gif'))
app.use('/test/image/share', express.static('loveU/images/sharepage.jpg'))
app.use('/test/image/jingcai1', express.static('loveU/images/shunjian1.png'))
app.use('/test/image/jingcai2', express.static('loveU/images/shunjian2.png'))
app.use('/test/image/jingcai3', express.static('loveU/images/shunjian3.png'))
app.use('/download/image', express.static('XDF/text/mockData.xml')) // test
app.use('/download/android',express.static('download/android.apk')) // download android package.
app.use('/download/ios',express.static('download/ios.ipa')) // download ios package.
app.use('/xdf', express.static('XDF/index.html'))


app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
})