var restify = require('restify');
var utils = require('./utils.js');

var port = process.env.PORT || 8080;

// GET /alive => are we alive yet?
function alive(req, res, next) {
  res.send({ status: 'alive', uptime: utils.uptime() });
  next();
}

function pull(req, res, next) {
  try {
    console.log('pull');
    throw Error();
    res.send();
  } catch (e) {
    res.send({ error: 'dun goofed' });
  } finally {
    next();
  }
}

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

server.get('/alive', alive);
server.post('/pull', pull);

server.listen(port, function() {
  console.log('Listening on :%s', port);
});
