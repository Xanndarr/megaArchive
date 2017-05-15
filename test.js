var fs = require('fs');

var buf = fs.readFileSync('/tmp/public-key.pem').toString();
var json = JSON.stringify({
  url: 'https://mega.nz/#!ZNoEFY6D!wE7Ej2YqwGZXZ9e7wChF1VqznmQiosf4XL9bdorLn0s',
  pem: buf,
});
console.log(json);
