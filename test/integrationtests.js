var expect  = require('chai').expect;
var request = require('request');
var server = require('../server.js');

describe('Basic testing', function(){    
    it('Status', function(done) {
        request('http://localhost/status' , function(error, response, body) {
            console.log(error);
            console.log(response.statusCode);
            console.log(body);
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Ok!');
            done();
        });
    });

    //Stop local server instance after tests pass
    after(function(done) {
        process.exit();
    });
});