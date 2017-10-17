function requestAnswer(form){
  console.log(form);
  console.log(form.message.value);
  if(form.message.value == "dev-tools"){
    showDevTools();
    console.log("Showing dev tools");
    return;
  }
  $.get("http://localhost/uniqueId", function(data){
    alert(data);
  });
}

function getStatus(){
    getRequest("status");
}

function getUID(){
    getRequest("uniqueId");
}

function getNLP(){
    getRequest("nlp");
}

function getRequest(endpoint){
    $.get("http://localhost/"+endpoint, function(data){
        alert(data);
    });
}

function showDevTools(){
    $("#dev-tools").css("display","block");
}

function sendLastFmRequest(){

}

function sendApiAiRequest(){

}