// source emo$ server:
{
  var portNumber = '8888', //src server
    dirName = './builds/src/',
    express = require('express'),
    app = express();
  app.use(express.static(dirName));
  app.listen(portNumber);

  console.log('new static express server is running, dir name = ' + dirName + ', port number = ' + portNumber);
}
// prod emo$ server:
{
  var __dirname = './builds/prod/' ;
  var __portNumber = 8999,
  express = require('express'),
    app = express();
  app.use(express.static(__dirname));
  app.listen(__portNumber);
  console.log('New Emo$ server is running, __dirname = ' + __dirname + ', port = ' + __portNumber);
}
// distribution emo$ server, used in form of a CDN (live access to resources):
{
  var __dirname = './builds/dist/' ;
  var __portNumber = 8666,
    express = require('express'),
    app = express();
  app.use(express.static(__dirname));
  app.listen(__portNumber);
  console.log('New Emo$ server is running, __dirname = ' + __dirname + ', port = ' + __portNumber);
}
//emo$ server - tests, jasmine:
{
  var __dirname = './tests/jasmine/' ;
  var __portNumber = 8804,
    express = require('express'),
    app = express();
  app.use(express.static(__dirname));
  app.listen(__portNumber);
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

  /*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });*/
  app.all('*/keywords', function(req, res, next) {
    req.originalUrl += '.xml'
    next();
  });
  app.all('*/standard', function(req, res, next) {
    req.originalUrl += '.xml'
    next();
  });
  app.all('*/lexicon', function(req, res, next) {
    req.originalUrl += '.txt'
    next();
  });
  app.all('*/lexicon_emoticons', function(req, res, next) {
    req.originalUrl += '.txt'
    next();
  });
 app.get('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('__dirname: ' +__dirname + req.originalUrl);
    res.sendfile(__dirname + req.originalUrl);
  });

  //http.createServer(app).listen(__portNumber);

  app.use(express.static(__dirname));
  app.listen(__portNumber);

  console.log('New Data server is running, __dirname = ' + __dirname + ', port = ' + __portNumber);
}
