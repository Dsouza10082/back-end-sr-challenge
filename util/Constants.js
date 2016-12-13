
Constants = {
    app: {
        name: 'Spot Service',
        port: 9005,
        pathDelimiter:'/',
        simultaneousTasks:20,
        connections:40,
        failedPostRetry:5
    },
    header: {
        json: 'application/json; charset=utf-8;'
    },
    http: {
        ok:         {cod:200, msg:'ok'},
        noContent:  {cod:204, msg:'No Content'},
        forbidden:  {cod:403, msg:'Forbidden'},
        notAuthorized:  {cod:401, msg:'ok'},
        notFound:   {cod:404, msg:'Not Found'},
        internalError:   {cod:500, msg:'Internal Error'}
    },
    firebaseConfig:{
        apiKey: "AIzaSyBwo37St39Q6vlq_x_TFA18YqYw3U5XSM0",
        authDomain: "spot-21907.firebaseapp.com",
        databaseURL: "https://spot-21907.firebaseio.com",
        storageBucket: "spot-21907.appspot.com",
        messagingSenderId: "21148626039"
    },
    session: {
        secret: '4yryrhejrhjejmmmcncn'
    },
    apiKey:{
        key:'AzEzDDuMqKmshsT9o3x7E9BwDVSCp1IgD0CjsnYpDz0oC4R7wW',
        key2RetrieveData:'wDVSCp1IgD0CjsnzEzDDuMqK'
    },
    apiCommand:{
        CONVERT:'convert',
        AVERAGE_PRICE:'average',
        RATES_ALL_SOURCES:'rates',
        GET_REQUEST_DATABASE_DATA:'requestDatabaseData',
        GET_RESPONSE_DATABASE_DATA:'responseDatabaseData'
    },
    apiEndPoint:{
        url:'https://community-bitcointy.p.mashape.com/'
    }
};

module.exports = Object.freeze(Constants);