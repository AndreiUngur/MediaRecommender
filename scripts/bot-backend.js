const apiai = require("apiai");
const uuidv1 = require('uuid/v1');
const env = require('./env.json');
const api_ai_key = env.apiai_client;
const unique_id = uuidv1(); //todo: one unique id per client

const app = apiai(api_ai_key);
var response_from_server; //Used to send the response from the server

var test_request;
var nlp_request;

var Requests = {
    
    apiai:function apiAi(res,query){
        nlp_request = app.textRequest(query.message,{
            sessionId: unique_id
        });

        response_from_server = res;
        ApiAiRequest(nlp_request);
        console.log("POST request to API.AI.");
    },

    apiaiget: function apiAiGet(res){
        //Test request
        test_request = app.textRequest('who is bob marley', {
            sessionId: unique_id
        });
        
        response_from_server = res;
        ApiAiRequest(test_request);
        //Track requests being made on the back-end.
        //TODO: add logging
        console.log("GET request to API.AI.");
    },

    status:function Status(){
        return "Ok!";
    },

    uid: function uniqueId(){
        return unique_id;
    }
};

function ApiAiRequest(request){
    request.on('response',function(response){
        //Return a response to the client.
        response_from_server.send(response);
    });

    request.on('error', function(error) {
        //Return an error to the client.
        response_from_server.send("Error");
        console.log(error);
    });     

    request.end();
}

module.exports = Requests;