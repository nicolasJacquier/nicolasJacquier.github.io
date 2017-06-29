var express = require('express');
var app = express();
var fs = require("fs");

app.post('/List', function (req, res) {
   // read the file
   fs.readFile( __dirname + "/" + "testJson.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   //todo : after ten json objects..
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () { //server listen to localhost

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})