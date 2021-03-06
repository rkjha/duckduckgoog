var express = require('express'),
    http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  var query = "";
  if (req.query["q"]) {
    query = req.query["q"];
    if (query.match(/![A-Za-z0-9]+/)) {
      res.redirect('https://duckduckgo.com?q=' + query);
    } else {
      res.redirect('https://encrypted.google.com/search?q=' + query);
    }
  }
  res.render('index', { query: req.query["q"] });
});

app.get('/browser', function(req, res) {
  res.render('browser');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
