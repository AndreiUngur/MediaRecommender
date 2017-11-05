var express = require('express'),
bot = require('./scripts/bot-backend');

var app = express();

app.use(express.static(__dirname));

app.get('/status', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','https://andreiungur.github.io');
    res.send(bot.status());
});

app.get('/uniqueId', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','https://andreiungur.github.io');
    res.send(bot.uid());
});

app.get('/nlp', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','https://andreiungur.github.io');
    bot.apiaiget(res);
});

app.post('/nlp', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','https://andreiungur.github.io');
    bot.apiaipost(res,req.query);
});

//Might not be exposed to client, only for testing at the moment.
app.post('/lastfm', function(req, res){
    console.log("LastFM Query");
    bot.lastfmpost(res,req.query);
});

//Might not be exposed to client, only for testing at the moment.
app.post('/news', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','https://andreiungur.github.io');
    console.log("News Query");
    bot.newspost(res,req.query);
});

var port = process.env.PORT || 1234
app.listen(port);

console.log("Server running on port: "+port);