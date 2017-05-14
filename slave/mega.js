var spawn = require('child_process').spawn;

var dl_link =
  'https://mega.nz/#!ZNoEFY6D!wE7Ej2YqwGZXZ9e7wChF1VqznmQiosf4XL9bdorLn0s';

var megadl = spawn('megadl', [dl_link]);

megadl.stdout.on('data', function(data) {
  var progress = data.toString().match(/\d+.\d+%/);
  var speed = data.toString().match(/([^\(]+)\/s/);
  if (progress && progress.length > 0 && speed && speed.length > 0) {
    console.log(progress[0], speed[0]);
  } else {
    console.log(data.toString());
  }
});

megadl.on('exit', function(code) {
  if (code === 0) {
    console.log('megadl: success');
  } else {
    console.log('megadl: error');
  }
});
