function send_data()
{
	var Client = require('node-rest-client').Client;
	var client = new Client();
	// direct way 
	var request = require('request');

	request.post(
		'http://127.0.0.1:8081/',
		{ json: { 'filename': "18.json","count":"1"} },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				for(var i=0;i<body.length; i++)
				 console.log(body[i]._id);
			}
		}
	);

}
