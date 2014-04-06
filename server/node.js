// emo$ server:
{
  var __dirname = './builds/src/' ;
  var __portNumber = 8889;
  var connect = require('connect');
  connect.createServer(
    connect.static(__dirname)
  ).listen(__portNumber);
  console.log('New Emo$ server is running, __dirname = ' + __dirname + ', port = ' + __portNumber);
}
// data server:
{
  // install express package: 'npm install express'
  var __dirname = './data',
    __portNumber = 8899;
  var express = require('express'),
    http = require('http');
  var app = express();
  app.configure(function(){
    //app.use(express.static(__dirname));
  });
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('1' + req);
    next();
  });
  app.get('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('__dirname: ' +__dirname + req.originalUrl);
    res.sendfile(__dirname + req.originalUrl);
  });

  http.createServer(app).listen(__portNumber);
  console.log('New Data server is running, __dirname = ' + __dirname + ', port = ' + __portNumber);
}
