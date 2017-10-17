const apiai = require("apiai");
const uuidv1 = require('uuid/v1');
const env = require('./env.json');
const api_ai_key = env.apiai_client;
const unique_id = uuidv1();

const app = apiai(api_ai_key);
var response_from_server; //Used to send the response from the server

var test_request = app.textRequest('who is bob marley', {
    sessionId: unique_id
});

var Requests = {

    uid: function uniqueId(){
        return unique_id;
    },

    apiai:function apiAiGet(form,res){
        response_from_server = res;
        ApiAiRequest();
        //Track requests being made on the back-end.
        //TODO: add logging
        console.log("GET request to API.AI.");
    },
    
    status:function Status(){
        return "Ok!";
    }
};

function ApiAiRequest(){
    test_request.on('response',function(response){
        //Return a response to the client.
        response_from_server.send(response);
    });

    test_request.on('error', function(error) {
        //Return an error to the client.
        response_from_server.send("Error");
        console.log(error);
    });     

    test_request.end();
}

module.exports = Requests;