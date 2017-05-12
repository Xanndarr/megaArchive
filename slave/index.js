var restify = require('restify');
var utils = require('./utils.js');

var port = process.env.PORT || 8080;

// GET /alive => are we alive yet?
function alive(req, res, next) {
  res.send({ status: 'alive', uptime: utils.uptime() });
  next();
}

var server = restify.createServer();
server.get('/alive', alive);

server.listen(port, function() {
  console.log('Listening on :%s', port);
});
