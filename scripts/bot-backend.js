const apiai = require("apiai");
const uuidv1 = require('uuid/v1');
const env = require('./env.json');
const api_ai_key = env.apiai_client;
const unique_id = uuidv1();

const app = apiai(api_ai_key);
var current_message = "";
var test_request = app.textRequest('who is bob marley', {
    sessionId: unique_id
});

var Requests = {

    uid: function uniqueId(){
        return unique_id;
    },

    apiai:function apiAiGet(form){
        //todo: fix problem with listeners. Right now, they log the response but I'm not able to return it
        //due to the asynchronous nature of the calls.
        ApiAiRequest();
        return "Processed!";
    },
    
    status:function Status(){
        return "Ok!";
    }
};

function ApiAiRequest(){
    test_request.on('response', function(response) {
        console.log(response.result.fulfillment.speech);
    });
    
    test_request.on('error', function(error) {
        console.log(error);
    });     
    
    test_request.end() 
}

module.exports = Requests;