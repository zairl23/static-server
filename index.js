// https://cnodejs.org/topic/4f16442ccae1f4aa27001071
var http = require('http');
var fs = require('fs');
var path = require("path");
var url = require('url');
var PORT = process.env.PORT || 8080;
var mimes = {

  "css": "text/css",

  "gif": "image/gif",

  "html": "text/html",

  "ico": "image/x-icon",

  "jpeg": "image/jpeg",

  "jpg": "image/jpeg",

  "js": "text/javascript",

  "json": "application/json",

  "pdf": "application/pdf",

  "png": "image/png",

  "svg": "image/svg+xml",

  "swf": "application/x-shockwave-flash",

  "tiff": "image/tiff",

  "txt": "text/plain",

  "wav": "audio/x-wav",

  "wma": "audio/x-ms-wma",

  "wmv": "video/x-ms-wmv",

  "xml": "text/xml"

};


http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname.slice(-1) === "/") {
        pathname = pathname + 'index.html';
    }
   var realPath = pathname.slice(1);


  fs.exists(realPath, function (exists) {

      if (!exists) {

          response.writeHead(404, {'Content-Type': 'text/plain'});

          response.write("This request URL " + pathname + " was not found on this server.");

          response.end();

      } else {

          fs.readFile(realPath, "binary", function(err, file) {

              if (err) {

                  response.writeHead(500, {'Content-Type': 'text/plain'});

                  response.end(err);

              } else {

                  var ext = path.extname(realPath);

                  ext = ext ? ext.slice(1) : 'unknown';

                  var contentType = mimes[ext] || "text/plain";

                  response.writeHead(200, {'Content-Type': contentType});

                //   response.writeHead(200, {'Content-Type': 'text/html'});

                  response.write(file, "binary");

                  response.end();

              }

           });

        }

    });
}).listen(PORT);

console.log("Server runing at port: " + PORT + ".");
