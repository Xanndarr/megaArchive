var restify = require('restify');
var uuid = require('uuid/v4');

var utils = require('./utils.js');
var Downloader = require('./download.js').Downloader;

var port = process.env.PORT || 8080;
var dlInstance = new Downloader();
var id;

// GET /alive => are we alive yet?
function alive(req, res, next) {
  res.send({ status: 'alive', uptime: utils.uptime() });
  next();
}

// POST /pull { url } => start downloading from url
function pull(req, res, next) {
  if (dlInstance.progress() === 'error') {
    id = uuid();
    dlInstance.start(req.body.url, req.body.pem, dlInstance);
  }
  res.send({ id });
  next();
}

// POST /progress { id } => download progress
function progress(req, res, next) {
  if (req.body.id === id) {
    res.send({ progress: dlInstance.progress() });
  } else {
    res.send();
  }
  next();
}

// POST /results { id } => results of encryption = { checksum, filename }
function results(req, res, next) {
  if (req.body.id === id) {
    res.send({ results: dlInstance.results() });
  } else {
    res.send();
  }
  next();
}

// POST /stop { id } => stop download
function stop(req, res, next) {
  if (req.body.id === id) {
    dlInstance.stop();
    id = undefined;
    res.send({ status: 'Job cancelled' });
  } else {
    res.send();
  }
  next();
}

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

server.get('/alive', alive);
server.post('/pull', pull);
server.post('/progress', progress);
server.post('/results', results);
server.post('/stop', stop);

server.listen(port, function() {
  console.log('Listening on :%s', port);
});
