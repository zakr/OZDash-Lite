var express = require('express')
	, http = require('http')
  	, path = require('path')	
  	// Need to add socket.io to Express before we use mySql for anything.
	// , sqlQuery = require('./server/queries/mysqlQuery')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use('/client',express.static(path.join(__dirname, '/client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//All routing after initial request goes through angular. Just need to load the layout template on first request.
app.get('/', function(req, res) {
      return res.render('layout', {
        title: 'OZDash-Lite'
      });
  });


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


// Need to get socket.io and Express working together.
