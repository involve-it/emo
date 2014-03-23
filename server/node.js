{
  var __dirname = './source/' ;
  var __portNumber = 8889;
  var connect = require('connect');
  connect.createServer(
    connect.static(__dirname)
  ).listen(__portNumber);
  console.log('New Emo$ server is running, __dirname = ' + __dirname + ', port = ' + __portNumber);
}
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
{
  var __dirname = './data/' ;
  var __portNumber = 8877;
  var http = require("http");
  var connect = require('connect');

  var app = connect()
    .use(connect.logger('dev'))
    //.use(connect.static(__dirname))
    .use(function(req, res){
      console.log('2' );

      res.setHeader("Access-Control-Allow-Origin", "*");
      //res.header("Access-Control-Allow-Origin", "*");
      //res.header("Access-Control-Allow-Headers", "X-Requested-With");
      //console.log('2' + res.header('Access-Control-Allow-Headers'));

      //req.setHeader("Access-Control-Allow-Origin", "*");
      //res.end('hello world\n');
      //next();
      res.sendfile(__dirname + '/' + req);
    });

  var server = http.createServer(app);
  server.listen(__portNumber, function () {
    console.log('server is listening');
  });
}