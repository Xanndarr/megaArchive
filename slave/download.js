var spawn = require('child_process').spawn;
var fs = require('fs');
var rimraf = require('rimraf');

var encrypt = require('./encrypt.js');
var upload = require('./upload.js');

var DL_FOLDER = 'dl/';

function Downloader() {
  var downloadProgress = undefined;
  var proc = undefined;
  var results = {};

  this.start = function(url, pub_key) {
    if (proc) return;
    downloadProgress = '0%';
    rimraf.sync(DL_FOLDER);
    fs.mkdirSync(DL_FOLDER);
    proc = spawn('megadl', ['--path', DL_FOLDER, url]);

    proc.stdout.on('data', function(data) {
      var progress = data.toString().match(/\d+.\d+%/);
      var speed = data.toString().match(/([^\(]+)\/s/);
      if (progress && progress.length > 0 && speed && speed.length > 0) {
        downloadProgress = progress[0];
        console.log(progress[0], speed[0]);
      } else {
        console.log(data.toString());
      }
    });

    proc.on('exit', function(code) {
      if (code === 0) {
        console.log('megadl: success');
        downloadProgress = '100%';
        results = encrypt.run(DL_FOLDER, pub_key);
        upload.run(results.filename);
      } else {
        console.log('megadl: error');
        downloadProgress = 'error';
      }
    });
  };

  this.progress = function() {
    return proc ? downloadProgress : 'error';
  };

  this.results = function() {
    return results;
  };

  this.stop = function() {
    if (proc) proc.kill();
    rimraf.sync(DL_FOLDER);
    proc = undefined;
    results = {};
  };
}

module.exports = { Downloader, DL_FOLDER };
