module.exports = function(app){
    var ctrl = app.controller.requestCtrl;
    app.get('/ping', ctrl.pingIsAlive);
    app.get('/help', ctrl.help);
    app.post('/v1/request/post',ctrl.getPostRequest);
    app.get('/v1/request/post/test',ctrl.getPostRequest);
}