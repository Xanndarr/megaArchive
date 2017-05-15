var spawn = require('child_process').spawn;

var ACD_REMOTE = 'acd:';
var GDRIVE_REMOTE = 'gdrive:uploads';

function run(filename, instance) {
  var acd = spawn('rclone', ['sync', filename, ACD_REMOTE]);
  var gdrive = spawn('rclone', ['sync', filename, GDRIVE_REMOTE]);

  instance.setUploadProgress({ acd: 'Uploading', gdrive: 'Uploading' });
  console.log(`Uploading: ${filename}`);

  acd.on('exit', function(code) {
    if (code === 0) {
      console.log(`rclone: success => ${ACD_REMOTE}`);
      instance.setUploadProgress({ acd: 'Complete' });
    } else {
      console.log(`rclone: error => ${ACD_REMOTE}`);
      instance.setUploadProgress({ acd: 'Failed' });
    }
  });

  gdrive.on('exit', function(code) {
    if (code === 0) {
      console.log(`rclone: success => ${GDRIVE_REMOTE}`);
      instance.setUploadProgress({ gdrive: 'Complete' });
    } else {
      console.log(`rclone: error => ${GDRIVE_REMOTE}`);
      instance.setUploadProgress({ gdrive: 'Failed' });
    }
  });
}

module.exports = { run };
