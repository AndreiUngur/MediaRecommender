var expect  = require('chai').expect;
var request = require('request');

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