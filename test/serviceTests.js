const constants  = require('../util/Constants');
const expect     = require("chai").expect;
const request    = require('request');

describe('Testando o serviço.', function() {
	
	describe('Request principal da API end point', function() {
		const url= `http://127.0.0.1:${constants.app.port}/ping`;
		it('O serviço deve responder  {"cod":401,"status":"ok"}', function() {
			request(url, function(err, res, body) {
				if(err) throw err;
				expect(body).to.equal('{"cod":401,"status":"ok"}');
			});
		});
	});

    

});