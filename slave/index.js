var restify = require('restify');

var utils = require('./utils.js');

var state = require('./state.js').state;
var download = require('./download.js');

var port = process.env.PORT || 8080;

// POST /pull { url, pem } => start downloading from url
function pull(url, pem) {
  if (state.status === 'stopped' || state.status === 'running') {
    state.download.progress = '0%';
    state.download.speed = undefined;
    state.status = 'downloading';
    download.start(url, pem);
  }
}

// POST /stop => stop download
function stop() {
  state.status = 'stopped';
  download.stop();
}

function router(req, res, next) {
  try {
    switch (req.route.name) {
      case 'getping':
        break;
      case 'postpull':
        pull(req.body.url, req.body.pem);
        break;
      case 'poststop':
        stop();
        break;
      default:
    }
  } catch (e) {
    console.log(e);
    state.status = 'error';
  } finally {
    state.uptime = utils.uptime();
    res.send(state);
    next();
  }
}

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

server.get('/ping', router);
server.post('/pull', router);
server.post('/stop', router);

server.listen(port, function() {
  console.log('Listening on :%s', port);
  state.status = 'running';
});
