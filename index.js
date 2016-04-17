var express = require('express');
var http = require('http');

var app = express();
app.set("port", process.env.PORT || 3000);
// app.use("/resources", express.static(__dirname + '/resources'));
app.use("/", express.static(__dirname));

http.createServer(app).listen(app.get("port"));
