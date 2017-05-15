var spawn = require('child_process').spawnSync;
var fs = require('fs');
var uuid = require('uuid/v4');
var md5 = require('md5-file').sync;

var DL_FOLDER = require('./download.js').DL_FOLDER;

function run(pub_key) {
  console.log('Compressing...');
  var filename = compress();
  if (!filename) return;
  console.log(`${DL_FOLDER} => ${filename}`);
  var enc_filename = encrypt(filename, pub_key);
  console.log(`${filename} => ${enc_filename}`);
  var checksum = md5(enc_filename);
  console.log(`Checksum: ${checksum}`);
  return { filename: enc_filename, checksum };
}

function compress() {
  var filename = `${uuid()}.tar.gz`;
  var proc = spawn('tar', ['-zcvf', filename, DL_FOLDER]);

  if (proc.error) return;
  return filename;
}

function encrypt(filename, pub_key) {
  var PK_FILE = 'pub.pem';
  if (!fs.existsSync(PK_FILE)) fs.writeFileSync(PK_FILE, pub_key); // drop PK into file for openssl
  var proc = spawn('openssl', [
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
  return `${filename}.dat`;
}

module.exports = { run };
