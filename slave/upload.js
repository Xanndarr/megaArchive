var spawn = require('child_process').spawn;

var ACD_REMOTE = 'acd:';

function run(filename) {
  var proc = spawn('rclone', ['sync', filename, ACD_REMOTE]);
  console.log(`Uploading: ${filename}`);

  proc.on('exit', function(code) {
    if (code === 0) {
      console.log('rclone: success');
    } else {
      console.log('rclone: error');
    }
  });
}

module.exports = { run };
