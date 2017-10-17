var nlp_output;

function requestAnswer(form){
  console.log(form);
  console.log(form.message.value);
  if(form.message.value == "dev-tools"){
    showDevTools();
    console.log("Showing dev tools");
    return;
  }
  getNLP(form.message.value);
}

function getStatus(){
    getRequest("status",false);
}

function getUID(){
    getRequest("uniqueId",false);
}

function getNLP(message){
    getRequest("nlp",true);
}

function getRequest(endpoint,is_nlp){
    $.get("http://localhost/"+endpoint, function(data){
        nlp_output = data;
        console.log("is nlp request? "+is_nlp);
        if(is_nlp){
            console.log("nlp result:"+nlp_output.result);
            var bot_reply = nlp_output.result.fulfillment.speech;
            console.log(bot_reply);
            //Bot's reply becomes visible to the user
            $('#response').text(bot_reply);
        }
        console.log(data);
    });
}

function showDevTools(){
    $("#dev-tools").css("display","block");
}

function sendLastFmRequest(){

}

function sendApiAiRequest(){

}