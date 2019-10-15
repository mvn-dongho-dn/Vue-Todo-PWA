var fs = require('fs');
var http2 = require('http2');
var options = {
  key: fs.readFileSync('/path/to/server.key'),
  cert: fs.readFileSync('/path/to/server.cert')
};
http2.createServer(options, function(request, response) {
  response.end('Hello world!');
}).listen(8080);
