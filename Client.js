var Client = require('node-rest-client').Client;
 
var client = new Client();
 
// direct way 
var request = require('request');

request.post(
    'http://127.0.0.1:8081/List',
    { json: { key: "name" } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);