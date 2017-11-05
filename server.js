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
    bot.apiaiget(res);
});

app.post('/nlp', function(req, res){
    bot.apiaipost(res,req.query);
});

//Might not be exposed to client, only for testing at the moment.
app.post('/lastfm', function(req, res){
    console.log("LastFM Query");
    bot.lastfmpost(res,req.query);
});

//Might not be exposed to client, only for testing at the moment.
app.post('/news', function(req, res){
    console.log("News Query");
    bot.newspost(res,req.query);
});

app.listen(80);

console.log("Server running on localhost");