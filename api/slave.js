var spawn = require('child_process').spawn;



function run() {
  console.log('in slave!');
  setTimeout(function() {
    run();
  }, 500);
  generatePem();
}

function generatePem(id) {
  var openssl = spawn('openssl', [
    '-x509',
    '-batch',
    '-newkey',
    'rsa:2048',
    '-keyout',
    `${id}.private.pem`,
    '-out',
    `${id}.public.pem`,
    '-passout',
    '"pass:changeme"',
  ]);

  openssl.on('exit', function(code, signal) {
    if (code === 0) {
      console.log(`openssl: success => ${id}`);
    } else if (signal === 'SIGTERM') {
      console.log('tar: user stopped');
    } else {
      console.log('tar: error');
    }
  });
}

start();
