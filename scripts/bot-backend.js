//Node modules used
const apiai = require("apiai");
const lastfm = require("lastfmapi");
const uuidv1 = require('uuid/v1');

//Local files used
const env = require('./env.json');

//Parameters needed for API's
const api_ai_key = env.apiai_client;
const lfm_key = env.lastfm_key;
const lfm_secret = env.lastfm_secret;
const unique_id = uuidv1(); //todo: one unique id per client

//API initialization
const app = apiai(api_ai_key);
const lfm = new lastfm({
    'api_key':lfm_key,
    'secret':lfm_secret
});

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

    lastfm:function lastFmGet(res,query){
        lfm.artist.getInfo({'artist':query.artist},function(err,artist){
            res.send(artist);
        });
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
        var extra_data;
        switch(response.result.metadata.intentName){
            case "artist_info":
                lfm.artist.getInfo({'artist':response.result.parameters.Artist},function(err,artist){
                    bio = artist.bio.summary;
                    response_from_server.send(bio);
                });
                break;
            default:
                extra_data = "";
                response_from_server.send(response.result.fulfillment.speech); 
                break;
        }
    });

    request.on('error', function(error) {
        //Return an error to the client.
        response_from_server.send("Error");
        console.log(error);
    });     

    request.end();
}

module.exports = Requests;