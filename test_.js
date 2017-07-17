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
	counter_ = 0;
	tmp_prevCount = 0;
	finalData=[];
	post_counter += 1;
	req.on("data",function(chunk){ bodyStr += chunk.toString();});
	req.on("end",function(){
		req_parsed_ = JSON.parse(bodyStr)
		__counter__ += parseInt(req_parsed_.count);

		console.log(__counter__);

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
			{		
			        //if(data.geo != undefined)
						//console.log(data.geo.coordinates);
					
					if(is_first_post_ == true)
					{
						if((counter_ < __counter__) && (is_first_post_ == true))
							finalData.push(data);
						if((counter_ == __counter__) && (is_first_post_ == true))
						{ 
							 prevCount = counter_
							 stream.unpipe();
							 res.end( JSON.stringify(finalData));
							 finalData=[];
							 is_first_post_ = false;
						} 
						counter_+=1		
					}		  
					
					
					if(post_counter > 1 && is_first_post_ == false)
					{
						//stream.unpipe();
						
						console.log(req_parsed_.count, prevCount);
						if(counter_ == __counter__)
						{	
							stream.unpipe(); 
							prevCount = counter_;
							stream.unpipe();
							res.end( JSON.stringify(finalData));
							console.log(finalData);
							finalData=[];
						}
						
						if(counter_ > prevCount)
						{
							//console.log(counter_);
							finalData.push(data);
						}
						console.log(k);
						counter_ += 1
						k+=1
					}
			})); 		
	});
});

function ff(dat)
{
	console.log(dat);
	
}