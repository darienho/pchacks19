// hosting on 8088
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
var ingredients=[];
var http = require('http'),
	url = require('url');

const WebHook = "https://5c906d00.ngrok.io";

// import watson
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  // vvv Remove later vvv
  iam_apikey: '0OCx1KkkHwPXrfwRVbPwoCLt25k3rJxEcE0kHCE26HsJ'
});
// end of import

app.use('/',express.static('static_files')); // this directory has files to be returned
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

// Send image to watson + Update ingredient list
app.post('/api/Upload', upload.array('file', 12), function (req, res, next) {
    
	console.log(req.files)

    // Make sure to change
	var url = WebHook+'/uploads/'+ req.files[0].originalname;	
	var classifier_ids = ["food"];

	var params = {
  		url: url,
  		classifier_ids: classifier_ids
	};
	setTimeout(function(){
	visualRecognition.classify(params, function(err, response) {
  		if (err)
  			// Failure
    		console.log(err);
  		else{
  			// Success
    		// console.log(JSON.stringify(response, null, 2))
    		// Read response and find none type hyarched data
    		var lst = response.images[0].classifiers[0].classes
    		console.log(lst)
    		var lst1 = [];
    		for (var i =0 ; i< lst.length; i++){
    			if (lst[i].type_hierarchy && ! lst[i].class.includes(' ') && !lst[i].class==='non-food'){
    				// This is shit code -> From Anthony to Anthony
    				var b = true;
    				for (var j =0; j<ingredients.length; j++){
    					if (ingredients[j] === lst[i].class ){
    						b=false;
    					}
    				}
    				if (b){
						ingredients.push(lst[i].class);
    		}
    				// End of shit code
    			}
    		}
    		console.log(ingredients);
    		// We want to broadcast all ingredients after
    		wss.broadcast("");
    		}
		});}, 3000);
    res.send("done");
});

// remove ingredient
app.get('/api/remove/:ingredient', function (req, res) {
	// Gotta Finish this
	var i = req.params.ingredient;
	for (var j =0; j<ingredients.length; j++){
    	if (ingredients[j] === i){
    		ingredients.splice(j, 1);

    		break;
    	}
    }
    wss.broadcast("");

	var result = {};
  	res.status(200);
	res.json(result);
});

app.listen(8088, function () {
  console.log('Example app listening on port 8088!');
});




// **********************************************************
// websocketstuff -> YAY!

var WebSocketServer = require('ws').Server
   ,wss = new WebSocketServer({port: 8090});

var col = {};

wss.on('close', function() {
    console.log('disconnected');
});

wss.broadcast = function(message){
	// send everyone updates ingredient lst
	retval = {'ingredient': ingredients};
	for(let ws of this.clients){ 
		ws.send(JSON.stringify(retval)); 
	}
}

wss.on('connection', function(ws) {	
	// Send ingredients on connection
	retval = {'ingredient': ingredients};
	console.log(retval)
	ws.send(JSON.stringify(retval)); 
	// Setup websocket to receive -> wont use but who cares
	ws.on('message', function(message) {
		// Do nothing on message
	});
});

// **********************************************