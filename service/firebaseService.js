var firebase     = require("firebase");
var constants    = require('../util/Constants');
var Deferred     = require("promised-io/promise").Deferred;

firebase.initializeApp(constants.firebaseConfig);

exports.insertDataRequest = function(data) {
   
   var deferred = new Deferred();
   var db = firebase.database(); 
   var ref = db.ref("/requests");

   ref.push(data);
   deferred.resolve(true);
   
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