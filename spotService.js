var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
var load           =        require('express-load');
var constants      =        require('./util/Constants');
var engine         =        require('ejs-mate');
var session        =        require('express-session');
var compression    =        require('compression');
var cors           =        require('cors');

app.engine("ejs",engine);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', constants.app.port);
app.set('title', constants.app.name);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
app.use(express.static(__dirname+'/public'));
app.use('/lib', express.static(__dirname+'/public/lib'));
app.use(session({secret:constants.session.secret}));
app.use(compression());

load('service').then('controller').then('routes').into(app);

app.listen(constants.app.port,function(){
    console.log("Serviço iniciado com sucesso na porta  " + constants.app.port);
});

