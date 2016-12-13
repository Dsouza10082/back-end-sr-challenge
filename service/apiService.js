var constants  = require('../util/Constants');
var unirest    = require('unirest');
var Deferred   = require("promised-io/promise").Deferred;


/*
    Converte a quantidade desejada de Bitcoin para o currency escolhido
*/
exports.convertBtc = function(qtd,currency) {
   var deferred = new Deferred();
 
   unirest.get(constants.apiEndPoint.url + "convert/"+ qtd +"/"+ currency +"")
          .header("X-Mashape-Key", constants.apiKey.key)
          .end(function (result) {    
          deferred.resolve(result.body);    
   }); 
   return deferred.promise;
}

/*
    Retorna o melhor preço, pelo currency
*/
exports.average = function(currency) {
   var deferred = new Deferred();
   unirest.get(constants.apiEndPoint.url + "average/"+ currency +"")
          .header("X-Mashape-Key", constants.apiKey.key)
          .end(function (result) {
          deferred.resolve(result.body);    
   }); 
   return deferred.promise;
}

/*
    Retorna a lista de valores em geral para aquele currency
*/
exports.rates = function(currency) {
   var deferred = new Deferred();
   unirest.get(constants.apiEndPoint.url + "all/" + currency +"")
          .header("X-Mashape-Key", constants.apiKey.key)
          .end(function (result) {
          deferred.resolve(result.body);    
   }); 
   return deferred.promise;
}