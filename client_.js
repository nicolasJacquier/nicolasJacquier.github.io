var Client = require('node-rest-client').Client;
var client = new Client();
// direct way 
var request = require('request');

request.post(
    'http://127.0.0.1:8081/List',
    { json: { 'filename': "17.json","count":"6"} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            for(var i=0;i<body.length; i++)
			 console.log(body[i]._id);
        }
    }
);