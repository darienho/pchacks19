// hosting on 8088
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
var ingredients=[];

const WebHook = "https://edb1b6a7.ngrok.io";


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


var Storage = multer.diskStorage(
	{ destination: function(req, file, callback) { callback(null, "./static/uploads"); },
	   filename: function (req, file, cb) {
      	cb(null,  file.originalname );
  		} });
// var upload = multer({storage: Storage}).array("imgUploader", 3);
var upload = multer({ storage: Storage });
// ********************************************

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// This is a tempoary thing, to be switched
app.post('/api/Upload', upload.array('file', 12), function (req, res, next) {
    console.log()

    res.send("done");
});

// Swap to Upload
app.post('/api/Upload2', upload.array('file', 12), function (req, res, next) {
    
    // Make sure to change
	var url = WebHook+'/uploads/'+ req.files[0].originalname;	
	var classifier_ids = ["food"];

	var params = {
  		url: url,
  		classifier_ids: classifier_ids
	};

	visualRecognition.classify(params, function(err, response) {
  		if (err)
  			// Failure
    		console.log(err);
  		else{
  			// Success
    		// console.log(JSON.stringify(response, null, 2))
    		// Read response and find none type hyarched data
    		var lst = response.images[0].classifiers[0].classes
    		console.log(lst.length)
    		var lst1 = [];
    		for (var i =0 ; i< lst.length; i++){
    			if (lst[i].type_hierarchy){
    				lst1.push(lst[i].class)
    			}
    		}
    		console.log(lst1);
    		wss.broadcast("");
    		}
		});
    res.send("done");
});

// remove ingredient
app.put('/api/remove/:ingredient', function (req, res) {
	var i = req.params.ingredient;
	var result = {};
  	res.status();
	res.json(result);
});

app.listen(8088, function () {
  console.log('Example app listening on port 8088!');
});

// **********************************************************

var WebSocketServer = require('ws').Server
   ,wss = new WebSocketServer({port: 8090});

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
	wss.broadcast("");
	ws.on('message', function(message) {
		wss.broadcast(message);
	});
});
