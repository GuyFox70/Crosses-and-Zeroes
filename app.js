const express = require('express');
const config = require('config');
const favicon = require('express-favicon');
const path = require('path');
const cleanCss = require('./public/stylesheet/cleanCSS');
const compressImg = require('./public/images/compressImage');

const app = express();
const http = require('http').createServer(app);
const WebSocketServer = require('websocket').server;

cleanCss();
// compressImg();

const indexRouter = require('./router/index')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon/favicon.ico'));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

let server = http.listen(config.get('customer.port'), () => {
  console.log('server works!!!');
});

wsServer = new WebSocketServer({
  httpServer: server
});

const connections = [];

const gamers = [
  {'key': 'gamers', 'smb': 'x'},
  {'key': 'gamers', 'smb': '0'}
];

wsServer.on('connect', function(connection) {
  connections.push(connection);
  let elem = connections.length - 1;

  if (connections.length <= 2) {
    connections[elem].sendUTF(JSON.stringify(gamers[elem]));
  } else {
    connections[elem].close();
    connections.pop();
  }
});

wsServer.on('request', function(request) {
  const connection = request.accept(null, request.origin);

  connection.on('message', function(msg) {
    
    let obj = JSON.parse(msg.utf8Data);
    obj.num = 0;
  
    for (let connect of connections) {

      if (connection !== connect) {
        connect.sendUTF(JSON.stringify(obj));
      }
      
    }

  });

  connection.on('close', function(connection) {
  
  });
  
});