var firebase     = require("firebase");
var constants    = require('../util/Constants');
var Deferred     = require("promised-io/promise").Deferred;

firebase.initializeApp(constants.firebaseConfig);

exports.insertDataRequest = function(data) {
   var deferred = new Deferred();
   _validateRequest(data)
     .then(function(isValid){
      if(isValid){
        var db = firebase.database(); 
        var ref = db.ref("/requests");
        ref.push(data);
        deferred.resolve(true);
      }else{
        deferred.resolve(false);
      }  
   });
   return deferred.promise;
}

exports.insertDataResponses = function(data) {
   
   var deferred = new Deferred();
   var db = firebase.database(); 
   var ref = db.ref("/responses");

   ref.push(data);
   deferred.resolve(true);
   
   return deferred.promise;
}


exports.retrieveRequestList = function(key) {
   
   var deferred = new Deferred();

   if(constants.apiKey.key2RetrieveData == key){   
    var db = firebase.database();  
    var ref = db.ref("/requests");
    var lista = [];
    
    ref.once("value", function(snapshot) {       
        snapshot.forEach(function(request){
            lista.push(request.val());
        }) ;
        deferred.resolve(lista);
    });
   }else{
       deferred.resolve(false);
   }

   return deferred.promise;
}

exports.retrieveResponseList = function(key) {

  var deferred = new Deferred();

   if(constants.apiKey.key2RetrieveData == key){   
    var db = firebase.database();  
    var ref = db.ref("/responses");
    var lista = [];
    
    ref.once("value", function(snapshot) {       
        snapshot.forEach(function(response){
            lista.push(response.val());
        }) ;
        deferred.resolve(lista);
    });
   }else{
       deferred.resolve(false);
   }

   return deferred.promise;

}

function _validateRequest(request){
   
   var deferred = new Deferred();
   var valid = true;
   
   try{

    if(!request.service){
        valid = false;
    }

    if(request.service == constants.apiCommand.CONVERT){

        if(!request.data){ 
           valid = false;   
        }

        if(!request.data.qtd){
            valid = false;
        }

        if(!request.data.currency){
            valid = false;
        }
    }

    if(request.service == constants.apiCommand.AVERAGE_PRICE){

        if(!request.data){ 
           valid = false;  
        }
        
        if(!request.data.currency){
            valid = false;
        }
    }
   
   if(request.service == constants.apiCommand.RATES_ALL_SOURCES){

        if(!request.data){ 
           valid = false;   
        }
        
        if(!request.data.currency){
            valid = false;
        }
    }
    
    if(request.service == constants.apiCommand.GET_REQUEST_DATABASE_DATA || 
       request.service == constants.apiCommand.GET_RESPONSE_DATABASE_DATA ){
        if(!request.key){ 
           valid = false;   
        }
    }
   
   }catch(err){
      valid = false;
   }

   
   deferred.resolve(valid);
   return deferred.promise;
}