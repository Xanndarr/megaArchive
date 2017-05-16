var spawn = require('child_process').spawn;
var fs = require('fs');
var uuid = require('uuid/v4');
var md5 = require('md5-file').sync;
var rimraf = require('rimraf');

var state = require('./state.js').state;
var upload = require('./upload.js');
var DL_DIR = require('./utils.js').DL_FOLDER;

var PK_FILE = 'pub.pem';
var compressor;
var encryptor;
var filename;

function run(pub_key) {
  state.status = 'processing';
  filename = `${uuid()}.tar.gz`;
  compress(pub_key);
}

function compress(pub_key) {
  console.log('Compressing...');
  state.status = 'compressing';
  compressor = spawn('tar', ['-zcvf', filename, DL_DIR]);

  compressor.on('exit', function(code, signal) {
    if (code === 0) {
      console.log('tar: success');
      console.log(`=> ${filename}`);
      encrypt(pub_key);
    } else if (signal === 'SIGTERM') {
      console.log('tar: user stopped');
    } else {
      console.log('tar: error');
      state.status = 'tar error';
    }
  });
}

function encrypt(pub_key) {
  console.log('Encrypting...');
  state.status = 'encrypting';
  if (!fs.existsSync(PK_FILE)) fs.writeFileSync(PK_FILE, pub_key); // drop PK into file for openssl

  encryptor = spawn('openssl', [
    'smime',
    '-encrypt',
    '-binary',
    '-aes256',
    '-in',
    filename,
    '-out',
    `${filename}.dat`,
    '-outform',
    'DER',
    PK_FILE,
  ]);

  encryptor.on('exit', function(code, signal) {
    if (code === 0) {
      console.log('openssl: success');
      console.log(`=> ${filename}.dat`);

      var checksum = md5(`${filename}.dat`);
      console.log(`Checksum: ${checksum}`);
      state.status = 'processing complete';
      state.processing.filename = `${filename}.dat`;
      state.processing.checksum = checksum;
      upload.run(`${filename}.dat`);
    } else if (signal === 'SIGTERM') {
      console.log('openssl: user stopped');
      state.processing.filename = undefined;
      state.processing.checksum = undefined;
    } else {
      console.log('openssl: error');
      state.status = 'openssl error';
    }
  });
}

function clean() {
  if (filename) {
    rimraf.sync(filename);
    rimraf.sync(`${filename}.dat`);
    rimraf.sync(PK_FILE);
  }
}

function stop() {
  if (compressor) compressor.kill();
  if (encryptor) encryptor.kill();
  clean();
  upload.stop();
}

module.exports = { run, stop, clean };
