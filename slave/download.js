var spawn = require('child_process').spawn;
var fs = require('fs');
var DL_FOLDER = 'dl/';

function Downloader() {
  var downloadProgress = undefined;
  var proc = undefined;

  this.start = function(url) {
    if (proc) return;
    fs.mkdirSync(DL_FOLDER);
    proc = spawn('megadl', [`--path ${DL_FOLDER}`, url]);

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
      } else {
        console.log('megadl: error');
        stop();
      }
    });
  };

  this.progress = function() {
    if (!proc) return 'error';
    return downloadProgress;
  };

  this.stop = function() {
    if (!proc) return;
    proc.kill();
    fs.rmdirSync(DL_FOLDER);
    proc = undefined;
  };
}

module.exports = { Downloader, DL_FOLDER };
