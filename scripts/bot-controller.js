var nlp_output;

function requestAnswer(form){
  console.log(form);
  console.log(form.message.value);
  if(form.message.value == "dev-tools"){
    showDevTools();
    console.log("Showing dev tools");
    return;
  }
  postNLP(form.message.value);
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

function postNLP(message){
    postRequest("nlp","message="+message,true);
}

function getRequest(endpoint,is_nlp){
    $.get("http://localhost/"+endpoint, function(data){
        if(is_nlp){
            handleNLPOutput(data);
        }
        console.log(data);
    });
}

/*
* "is_nlp" might be made more generic (copy pasting code..)
* or I might find a more modular way to
* make requests to the different API's
* At the moment, only handling post for "nlp"
*/
function postRequest(endpoint,query,is_nlp){
    $.post("http://localhost/"+endpoint+"?"+query, function(data){
        if(is_nlp){
            handleNLPOutput(data);
        }
        console.log(data);
    });
}

function handleNLPOutput(nlp_output){
    console.log("NLP result:"+nlp_output);
    //Bot's reply becomes visible to the user
    $('#response').text(nlp_output);
}

function showDevTools(){
    $("#dev-tools").css("display","block");
}

function sendLastFmRequest(){

}

function sendApiAiRequest(){

}