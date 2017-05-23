var restify = require('restify');
var fork = require('child_process').fork;

var utils = require('./utils.js');
var state = require('./state.js').state;
var slave = './slave.js';

var port = process.env.PORT || 8080;
var slaves = [];

function queue(url) {
  console.log(url);
  // 1. Parse url
  // 2. Spin up Slave server. Wait for response.
  // 3. Ping slave until API up
  slaves.push(fork(slave));
  console.log(slaves);
  // 4. Generate pem
  // 5. Send url and pem to slave.
  // 6. Ping until done.
  // 7. When done, take checksum, ID and upload status add index to DB
  // 8. Trash slave
}

function router(req, res, next) {
  try {
    switch (req.route.name) {
      case 'postqueue':
        queue(req.body.url);
        break;
      case 'getping':
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

function loadDownloads() {
  //state.downloads = [];
}

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.CORS());

server.get('/ping', router);
server.post('/queue', router);

loadDownloads();

server.listen(port, function() {
  console.log('Listening on :%s', port);
  state.status = 'running';
});
