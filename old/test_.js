var express = require('express');
var app = express();
var finalData=[];
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var cors = require('cors');
var tmp_ = []
JSONStream = require('JSONStream'),
es = require('event-stream');
var counter_ = 0
var fname_ = '';

var server = app.listen(8081, function () 
{
  var host = server.address().address
  var port = server.address().port
  //console.log("Example app listening at http://%s:%s", host, port)
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client_paga_.html'));
});

app.post('/', function (req, res) {
	var bodyStr = '';	
	finalData=[];
	counter_ = 0
	req.on("data",function(chunk){ bodyStr += chunk.toString(); });
    req.on("end",function(){
		
		req_parsed_ = JSON.parse(bodyStr);
		//fname_ = getFname(req_parsed_.filename);
		var stream = fs.createReadStream(req_parsed_.filename);
		
		
		var getStream = function () {
			parser = JSONStream.parse(['posts', true]);
			return stream.pipe(parser);
		};
		
		getStream().pipe(es.mapSync(function(data){
		 if(counter_ < req_parsed_.count)
		   finalData.push(data);
		 else
		 {
			 
		   stream.unpipe();
		   res.end( JSON.stringify(finalData));
		 }
		 counter_+=1
		}));
	}); 
});