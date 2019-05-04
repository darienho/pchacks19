// hosting on 8088
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

app.use('/',express.static('static_files')); // this directory has files to be returned
app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

var Storage = multer.diskStorage({ destination: function(req, file, callback) { callback(null, "./Images"); }, filename: function(req, file, callback) { callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); } });
var upload = multer({storage: Storage}).array("imgUploader", 3);

// ********************************************

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", bodyParser.json({limit: "50mb"}), function(req, res) {
	console.log(req);
	upload(req, res, function(err) {
		if (err) {
			console.log(err);
			return res.end("Something went wrong!");
		}
		console.log("i did it");
		return res.end("File uploaded sucessfully!.");
	});
});

// remove ingrediant
app.put('/api/remove', function (req, res) {
	var result = {};
  	res.status();
	res.json(result);
});

// remove ingrediant
app.put('/api/add', function (req, res) {
	var result = {};
  	res.status(404);
	res.json(result);
	console.log(req.body.name);
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
