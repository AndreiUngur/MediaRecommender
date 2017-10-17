var express = require('express'),
bot = require('./scripts/bot-backend');

var app = express();

app.use(express.static(__dirname));

app.get('/status', function(req, res){
    res.send(bot.status());
});

app.get('/uniqueId', function(req, res){
    res.send(bot.uid());
});

app.get('/nlp', function(req, res){
    bot.apiai(res);
});

app.listen(80);

console.log("Server running on localhost");