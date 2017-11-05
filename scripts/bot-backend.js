//Node modules used
const apiai = require("apiai");
const lastfm = require("lastfmapi");
const uuidv1 = require('uuid/v1');
const news_api = require('newsapi');

//Local files used
const env = require('./env.json');

//Parameters needed for API's
const api_ai_key = process.env.apiai_client || env.apiai_client;
const lfm_key = process.env.lastfm_key || env.lastfm_key;
const news_key = process.env.newsapi_key || env.newsapi_key;
const lfm_secret = process.env.lastfm_secret || env.lastfm_secret;
const unique_id = uuidv1(); //todo: one unique id per client

//API initialization
if(api_ai_key){
    //Api.ai key is empty on git, but the bot is initialized for testing.
    //This causes a crash which is avoided by initializing the api.ai app
    //only if the key is defined.
    var app = apiai(api_ai_key);
    console.log("Initialized API.AI with key: "+api_ai_key);
}
if(news_key){
    var news = new news_api(news_key);
    console.log("Initialized News API with key: "+news_key);
    console.log(news);
}

const lfm = new lastfm({
    'api_key':lfm_key,
    'secret':lfm_secret
});

//Global variables
var rest_of_artists; //"similar" returns the first 3 found, this will be used if the user wants more.

var response_from_server; //Used to send the response from the server

var test_request;
var nlp_request;

var Requests = {
    
    apiaipost:function apiAiPost(res,query){
        nlp_request = app.textRequest(query.message,{
            sessionId: unique_id
        });

        response_from_server = res;
        apiAiRequest(nlp_request);
        console.log("POST request to API.AI.");
    },

    apiaiget: function apiAiGet(res){
        //Test request
        test_request = app.textRequest('who is bob marley', {
            sessionId: unique_id
        });
        
        response_from_server = res;

        apiAiRequest(test_request);
        //Track requests being made on the back-end.
        //TODO: add logging
        console.log("GET request to API.AI.");
    },

    lastfmpost:function lastFmPost(res,query){
        lfm.artist.getInfo({'artist':query.artist},function(err,artist){
            res.send(artist);
        });
    },

    newspost:function newsPost(res, query){
        //First, we get sources for the user's desired field
        var sources;
        news.sources({
            category: 'technology', // comes from NLP, currently hardcoded for testing
            language: 'en', // hardcoded for the moment, TODO: get from NLP
            country: 'us' // ditto
        }).then(sourcesResponse => {
            var sources = sourcesResponse.sources;
            //Basic functionality: randomize the article selected
            var rand = Math.floor(Math.random()*sources.length);
            news.articles({
                source: sources[rand].id, // From sources. Potentially, could ask the user which source he wants 
                sortBy: 'top' 
            }).then(articlesResponse => {
                res.send(articlesResponse);
            });
        });
    },

    status:function Status(){
        return "Ok!";
    },

    uid: function uniqueId(){
        return unique_id;
    }
};

function apiAiRequest(request){
    request.on('response',function(response){
        //Return a response to the client.
        var intent = response.result.metadata.intentName;
        var input_artist = response.result.parameters.Artist;
        switch(intent){
            case "artist_info":
                lfm.artist.getInfo({'artist':input_artist},function(err,artist){
                    bio = artist.bio.summary;
                    response_from_server.send(bio);
                });
                break;
            case "artist_recommend":
            /* Look into how different the output string is compared to the input
            *  We shouldn't recommend to the user an artist "Bob marley & the wailers"
            *  if he asked for more artists like "Bob Marley".
            */
                lfm.artist.getSimilar({'artist':input_artist},function(err, similar){
                    /* For now, I simply shuffle the list of artists returned by last fm.
                    * In the future, also add a list with the "rest" of artists and
                    * return from those for subsequent queries, to avoid repeating artists. */
                    var first_three_artists = shuffle(similar.artist).slice(0,3).map(function(x){
                        return " "+x.name;
                    });
                    response_from_server.send("You should look into"+first_three_artists);
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

//Implementation of Fisher-Yates shuffle
function shuffle(input){
    for(var i=0;i<input.length;i++){
        var rand = Math.floor(Math.random()*i);
        var temp = input[rand];
        input[rand] = input[i];
        input[i] = temp; 
    }
    return input;
}

module.exports = Requests;