// hosting on 8088
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

// import watson
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: '0OCx1KkkHwPXrfwRVbPwoCLt25k3rJxEcE0kHCE26HsJ'
});
// end of import

app.use('/',express.static('static_files')); // this directory has files to be returned
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static('static')); 


var Storage = multer.diskStorage({ destination: function(req, file, callback) { callback(null, "./Images"); }, filename: function(req, file, callback) { callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); } });
// var upload = multer({storage: Storage}).array("imgUploader", 3);
var upload = multer({ dest: 'static/uploads/' })

// ********************************************

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// app.post("/api/Upload", bodyParser.json({limit: "10mb"}), function(req, res) {
// 	console.log(req);
// 	upload(req, res, function(err) {
// 		if (err) {
// 			console.log(err);
// 			return res.end("Something went wrong!");
// 		}
// 		console.log("i did it");
// 		return res.end("File uploaded sucessfully!.");
// 	});
// });

app.post('/api/Upload', upload.array('file', 12), function (req, res, next) {
    console.log(req.files)




    res.send("done");
});

app.post('/api/Upload2', upload.array('file', 12), function (req, res, next) {
    
	var url = 'https://edb1b6a7.ngrok.io/live-preview-potato.png';
	var classifier_ids = ["food"];

	var params = {
  		url: url,
  		classifier_ids: classifier_ids
	};

	visualRecognition.classify(params, function(err, response) {
  		if (err)
    		console.log(err);
  		else
    		console.log(JSON.stringify(response, null, 2))
		});

    res.send("done");
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
