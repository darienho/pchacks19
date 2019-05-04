// hosting on 8088
var express = require('express');
var app = express();

app.use('/',express.static('static_files')); // this directory has files to be returned

// ********************************************

// remove ingrediant
app.put('/api/remove', function (req, res) {
	var result = {};
  	res.status();
	res.json(result);
});

// remove ingrediant
app.put('/api/add', function (req, res) {
	var result = {};
  	res.status();
	res.json(result);
});

app.use(express.static('static')); 

app.listen(8088, function () {
  console.log('Example app listening on port 8088!');
});

// **********************************************************

var WebSocketServer = require('ws').Server
   ,wss = new WebSocketServer({port: 8090});

var ingredients=[];
var col = {};

wss.on('close', function() {
    console.log('disconnected');
});

wss.broadcast = function(message){
	for(let ws of this.clients){ 
		ws.send(message); 
	}
}

wss.on('connection', function(ws) {	
	ws.on('message', function(message) {
		wss.broadcast(message);
		messages.push(message);
	});
});
