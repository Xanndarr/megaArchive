var spawn = require('child_process').spawn;

var ACD_REMOTE = 'acd:';
var GDRIVE_REMOTE = 'gdrive:uploads';

function run(filename) {
  var acd = spawn('rclone', ['sync', filename, ACD_REMOTE]);
  var gdrive = spawn('rclone', ['sync', filename, GDRIVE_REMOTE]);
  console.log(`Uploading: ${filename}`);

  acd.on('exit', function(code) {
    if (code === 0) {
      console.log(`rclone: success => ${ACD_REMOTE}`);
    } else {
      console.log(`rclone: error => ${ACD_REMOTE}`);
    }
  });

  gdrive.on('exit', function(code) {
    if (code === 0) {
      console.log(`rclone: success => ${GDRIVE_REMOTE}`);
    } else {
      console.log(`rclone: error => ${GDRIVE_REMOTE}`);
    }
  });
}

module.exports = { run };
