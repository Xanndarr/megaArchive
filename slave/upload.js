var spawn = require('child_process').spawn;

var state = require('./state.js').state;

var ACD_REMOTE = 'acd:';
var GDRIVE_REMOTE = 'gdrive:uploads';

var acd;
var gdrive;

function run(filename) {
  console.log(`Uploading: ${filename}`);
  state.status = 'uploading';
  acd = spawn('rclone', ['sync', filename, ACD_REMOTE]);
  gdrive = spawn('rclone', ['sync', filename, GDRIVE_REMOTE]);

  acd.on('exit', function(code) {
    if (code === 0) {
      console.log(`rclone: success => ${ACD_REMOTE}`);
      state.upload.acd = 'Complete';
      finish();
    } else if (signal === 'SIGTERM') {
      console.log(`rclone: user stopped => ${ACD_REMOTE}`);
    } else {
      console.log(`rclone: error => ${ACD_REMOTE}`);
      instance.setUploadProgress({ acd: 'Failed' });
    }
  });

  gdrive.on('exit', function(code) {
    if (code === 0) {
      console.log(`rclone: success => ${GDRIVE_REMOTE}`);
      state.upload.gdrive = 'Complete';
      finish();
    } else if (signal === 'SIGTERM') {
      console.log(`rclone: user stopped => ${GDRIVE_REMOTE}`);
    } else {
      console.log(`rclone: error => ${GDRIVE_REMOTE}`);
      instance.setUploadProgress({ gdrive: 'Failed' });
    }
  });
}

function finish() {
  if (state.upload.acd === 'Complete' && state.upload.gdrive === 'Complete') {
    state.status = 'complete';
  }
}

function stop() {
  if (acd) acd.kill();
  if (gdrive) gdrive.kill();
}

module.exports = { run, stop };
