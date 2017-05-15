var spawn = require('child_process').spawnSync;
var fs = require('fs');
var uuid = require('uuid/v4');
var md5 = require('md5-file').sync;

function run(path, pub_key) {
  console.log('Compressing...');
  var filename = compress(path);
  if (!filename) return;
  console.log(`${path} => ${filename}`);
  var enc_filename = encrypt(filename, pub_key);
  console.log(`${filename} => ${enc_filename}`);
  var checksum = md5(enc_filename);
  console.log(`Checksum: ${checksum}`);
  return { filename: enc_filename, checksum };
}

function compress(path) {
  var filename = `${uuid()}.tar.gz`;
  var proc = spawn('tar', ['-zcvf', filename, path]);

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
