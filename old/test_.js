JSONStream = require('JSONStream'),
es = require('event-stream');

var express = require('express');
var app = express();
var finalData=[];
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')
var tmp_ = []
var counter_ = 0
var prevCount = 0
var tmp_prevCount = 0
var __counter__= 0;
var k=0;
var fname_ = '';
var isFirstPost = true;
var is_first_post_ = true;
var post_counter = 0;
var global_counter =0;
var rec__counter = 0;
var size_ = 0;
var last_chunk_size = 0;

var server = app.listen(8081, function () 
{
  var host = server.address().address
  var port = server.address().port
})
app.get('/', function(req, res) 
{ 
	res.sendFile(path.join(__dirname + '/index_main.html')); 
});

app.post('/', function (req, res) 
{
	var bodyStr = '';
	req.on("data",function(chunk){ bodyStr += chunk.toString();});
	req.on("end",function(){
		req_parsed_ = JSON.parse(bodyStr)
		if(post_counter == 0) { readFile(req_parsed_.filename, req_parsed_.count, req, res); }
		else { post__main_fun(req_parsed_.count, global_counter, req_parsed_.filename, req, res); }
	});
	
});

function post__main_fun(chunk_sizeClient, total__count, fname, req__, res__)
{
	var bodyStr = '';	
	counter_ = 0;
	tmp_prevCount = 0;
	finalData=[];
	post_counter += 1;
		var stream__ = fs.createReadStream(fname);
		var getStream__ = function () 
		{
			parser = JSONStream.parse(['posts', true]);
			return stream__.pipe(parser);
		};
		
		/*****************************************************************************************************/
		/// STREAMING THE FILE ////
		
		getStream__().pipe(es.mapSync(function(data)
		{		
				if(is_first_post_ == true)
				{
					if((counter_ < chunk_sizeClient) && (is_first_post_ == true))
					{ finalData.push(data);  }
					if((counter_ == chunk_sizeClient) && (is_first_post_ == true))
					{ 
						 //finalData.push(["EOF"]);
						 res__.end( JSON.stringify(finalData));
						 finalData = [];
						 prevCount = counter_;
						 stream__.unpipe();
						 is_first_post_ = false;
					} 
					counter_+=1		
				}		  
				
				
				if(post_counter > 1 && is_first_post_ == false)
				{
					
					if(chunk_sizeClient > (global_counter - prevCount)){ 
					
						console.log("NEAR TO END ... ", counter_, (global_counter - prevCount), (parseInt(prevCount) + parseInt(chunk_sizeClient)));
						last_chunk_size = (global_counter - prevCount) - 2;
						console.log("Last chunk "+ last_chunk_size);
						finalData.push(["EOF"]);
					
					}
					
					if(counter_ == (parseInt(prevCount) + parseInt(chunk_sizeClient)) && chunk_sizeClient < (global_counter - prevCount))
					{	
						stream__.unpipe(); 
						prevCount = counter_;
						stream__.unpipe();
						res__.end( JSON.stringify(finalData));
					}
					
					if(counter_ >= prevCount) finalData.push(data); 
					counter_ += 1
				}
		})); 	
}

function readFile(param, client_num_rec_req, request__, resp__)
{	
	var stream = fs.createReadStream(req_parsed_.filename);
	var getStream = function () 
	{
		stream.on('end',()=> {
			parser = JSONStream.parse(['posts', true]);
		return stream.pipe(parser);
			stream.unpipe();
			res.end( JSON.stringify(["EOF"]));
		});
		
		parser = JSONStream.parse(['posts', true]);
		return stream.pipe(parser);
	};
	getStream().pipe(es.mapSync(function(data)
	{global_counter+=1;}));
	stream.on('end',()=> {
			stream.unpipe();
			global_counter -= 1;
			post__main_fun(client_num_rec_req, global_counter, param, request__, resp__);
	});
	
};