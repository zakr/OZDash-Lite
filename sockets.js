var http = require('http');
var server = http.createServer(function(request,response){});
var sqlQuery = require('./mysqlQuery');
var WebSocketServer = require('websocket').server;
var count = 0;
var intervalPeriod = 2000; // 2 seconds
var clients = {};

server.listen(9002,function(){
	console.log((new Date()) + ' Server is listening on port 9002');
});


wsServer = new WebSocketServer({
	httpServer : server
});

wsServer.on('request', function(r){
	var connection = r.accept('echo-protocol', r.origin);
	
	// Specific id for this client & increment count
	var id = count++;
	// Store the connection method so we can loop through & contact all clients
	clients[id] = connection;

  	connection.on('close', function(reasonCode, description){
		delete clients[id];
	});

});

// Send a message to each client on a 2 second interval
var interval = setInterval(function(){
	sqlQuery.getSomeData(function(response){
		for(var i in clients){
			clients[i].sendUTF(response);
		}
	});
}, intervalPeriod);
