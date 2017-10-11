const apiai = require("apiai");
const uuidv1 = require('uuid/v1');
const api_ai_key = "";
const unique_id = uuidv1();

const app = apiai(api_ai_key);

var request = app.textRequest('who is bob marley', {
    sessionId: unique_id
});

var Requests = {

    uid: function uniqueId(){
        return unique_id;
    },

    apiai:function apiRequest(form){
        request.on('response', function(response) {
            console.log(response);
        });
         
        request.on('error', function(error) {
            console.log(error);
        });
         
        request.end();
    },

    status:function Status(){
        return "Ok!";
    }
};

module.exports = Requests;