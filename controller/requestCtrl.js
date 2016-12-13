const constants      = require('../util/Constants');
var apiService       = require('../service/apiService');
var firebaseService  = require('../service/firebaseService');
var Result           = require('../model/Result');
var Deferred         = require("promised-io/promise").Deferred;
var uuid             = require('uuid');
var request          = require('request');

module.exports = function(app){

    var requestCtrl = {

        getPostRequest: function(req,res){
        
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
          
          var json = req.body;
          var service = json.service;
          
          var result = Result;

          result.id = uuid.v1();
          json.id = result.id;

          var exec_start_at = new Date().getSeconds(); 

          firebaseService.insertDataRequest(json)
           .then(function(isInserted){
             if(isInserted){
                switch(service){
                  case constants.apiCommand.CONVERT:
                      _convertBtc(result,json.data).then(
                        function(ret){
                          var exec_end_at = new Date();
                          firebaseService.insertDataResponses(result).then(function(){
                             result.timeRequest = String(exec_end_at.getSeconds() - exec_start_at) + "s";
                             res.send(result);
                          });  
                      });  
                    break;
                    case constants.apiCommand.AVERAGE_PRICE:
                      _average(result,json.data).then(
                        function(ret){
                          var exec_end_at = new Date();
                          firebaseService.insertDataResponses(result).then(function(){
                             result.timeRequest = String(exec_end_at.getSeconds() - exec_start_at) + "s";
                             res.send(result);
                          });
                      });  
                    break;
                    case constants.apiCommand.RATES_ALL_SOURCES:
                      _rates(result,json.data).then(
                        function(ret){
                          var exec_end_at = new Date();
                          firebaseService.insertDataResponses(result).then(function(){
                             result.timeRequest = String(exec_end_at.getSeconds() - exec_start_at) + "s";
                             res.send(result);
                          });
                      });  
                    break;
                    case constants.apiCommand.GET_REQUEST_DATABASE_DATA:
                      var key = json.key;
                      firebaseService.retrieveRequestList(key).then(function(requestList){
                          res.send(requestList);
                      });  
                    break;
                    case constants.apiCommand.GET_RESPONSE_DATABASE_DATA:
                      var key = json.key;
                      firebaseService.retrieveResponseList(key).then(function(responseList){
                          res.send(responseList);
                      });   
                    break;
                  default:
                    result.message = 'Comando não encontrado.'
                    res.send(result);
                    break;
                 }
             } 
          });   
        },
        pingIsAlive: function(req,res){
          
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');

          _testUrl(req,res).then(function(urlResult){ 
             var statusServer = {
                  cod:urlResult.cod,
                  status:urlResult.msg
             };
             res.send(statusServer);
          });
        },
        help: function(req,res){
          
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');

          var strJson = " ****** INSTRUÇÕES DE USO ******** </br>" +
                       " </br>" +
                       " Para converter uma quantidade de Bitcoin para moeda escolhida  </br> " +
                       "&nbsp{ </br>" +
                       "&nbsp&nbsp  'service':'convert',  </br>" +
                       "&nbsp&nbsp   'data':{             </br>" +
                       "&nbsp&nbsp&nbsp&nbsp&nbsp     'qtd':'2',         </br>" +
	                     "&nbsp&nbsp&nbsp&nbsp&nbsp    'currency':'USD'   </br> " +
                       "&nbsp&nbsp&nbsp     }                 </br> " +
                       "&nbsp&nbsp }                     </br>" +    
                       "                       </br>" +
                       " Retorna o melhor preço para a moeda escolhida </br>" +
                       "                       </br>" +
                       "&nbsp&nbsp{ </br>" +
                       "&nbsp&nbsp  'service':'average', </br>" +
                       "&nbsp&nbsp&nbsp   'data':{            </br>" +
	                     "&nbsp&nbsp&nbsp&nbsp&nbsp    'currency':'USD'  </br>" +
                       "&nbsp&nbsp&nbsp    }                 </br>" +
                       "&nbsp&nbsp }                     </br>" + 
                       "&nbsp&nbsp                       </br>" +
                       " Retorna todos os valores para a moeda escolhida </br>" +
                       "                       </br>" +
                       "&nbsp&nbsp { </br>" +
                       "&nbsp&nbsp  'service':'rates', </br>" +
                       "&nbsp&nbsp&nbsp   'data':{            </br>" +
	                     "&nbsp&nbsp&nbsp&nbsp&nbsp     'currency':'USD'  </br>" +
                       "&nbsp&nbsp&nbsp     }                 </br>" +
                       "&nbsp&nbsp }                     </br>" ;      
          res.send(strJson);
        }
    };

    function _convertBtc(result,data){
     
        var deferred = new Deferred();
        result.data = {};

        if(result.message){
          result.message = '';
        }

        if(!data.qtd){
          result.message = 'Campo qtd é obrigatório para usar este serviço.'; 
        }
    
        if(!data.currency){
          result.message = 'Campo currency é obrigatório para usar este serviço.';
        }

        var qtd = data.qtd;
        var currency = data.currency;

        apiService.convertBtc(qtd,currency).then(function(resApi){
            result.data = JSON.parse(resApi);
            deferred.resolve(result); 
        });
     
       return deferred.promise;
    }

    function _average(result,data){
     
        var deferred = new Deferred();
        result.data = {};

        if(result.message){
          result.message = '';
        }

        if(!data.currency){
          result.message = 'Campo currency é obrigatório para usar este serviço.';
        }

        var currency = data.currency;

        apiService.average(currency).then(function(resApi){
            result.data = JSON.parse(resApi);
            deferred.resolve(result); 
        });
    
        return deferred.promise;
    }

     function _rates(result,data){
      
        var deferred = new Deferred();
        result.data = {};

        if(result.message){
          result.message = '';
        }
    
        if(!data.currency){
          result.message = 'Campo currency é obrigatório para usar este serviço.';
        }

        var currency = data.currency;

        apiService.rates(currency).then(function(resApi){
            result.data = JSON.parse(resApi);
            deferred.resolve(result);
        });

        return deferred.promise;
    }

    function _testUrl(req, res) {
      var deferred = new Deferred();
      request(constants.apiEndPoint.url, function (error, response, body) {
         //401 = sem autorização, mas funcionando.
        if (response.statusCode == 401) {
          deferred.resolve(constants.http.notAuthorized);
        } else {
          deferred.resolve(constants.http.internalError);
        }
      }); 
      return deferred.promise;
    };

    return requestCtrl;
};




