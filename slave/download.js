var spawn = require('child_process').spawn;
var fs = require('fs');
var rimraf = require('rimraf');

var state = require('./state.js').state;
var encrypt = require('./encrypt.js');
var DL_DIR = require('./utils.js').DL_FOLDER;

var proc;

function start(url, pub_key) {
  rimraf.sync(DL_DIR);
  fs.mkdirSync(DL_DIR);
  proc = spawn('megadl', ['--path', DL_DIR, url]);

  proc.stdout.on('data', function(data) {
    var progress = data.toString().match(/\d+.\d+%/);
    var speed = data.toString().match(/([^\(]+)\/s/);
    if (progress && progress.length > 0 && speed && speed.length > 0) {
      state.download.progress = progress[0];
      state.download.speed = speed[0];
      console.log(progress[0], speed[0]);
    } else {
      console.log(data.toString());
    }
  });

  proc.on('exit', function(code, signal) {
    if (code === 0) {
      console.log('megadl: success');
      state.download.progress = '100%';
      state.download.speed = undefined;
      encrypt.run(pub_key);
    } else if (signal === 'SIGTERM') {
      console.log('megadl: user stopped');
    } else {
      console.log('megadl: error');
      state.status = 'download error';
    }
  });
}

function clean() {
  rimraf.sync(DL_DIR);
}

function stop() {
  if (proc) proc.kill();
  clean();
  encrypt.stop();
}

module.exports = { start, stop, clean };
