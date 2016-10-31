"use strict";

var log = [],
    port = 8000,
    TOKEN = "lanzhiping",
    express = require("express"),
    bodyParser = require("body-parser"),
    sha1 = require('crypto').createHash('sha1'),
    httpServer = require("./server/httpServer");

function logRequest(req) {
    log.push({
        time: new Date(),
        message: req.body || req.query
    });
}

function checkSignature(params, token){
    var key = [TOKEN, params.timestamp, params.nonce].sort().join('');

    sha1.update(key);
    return sha1.digest('hex') === params.signature;
}


(function () {
    var app = express();

    app.use(bodyParser.json())
       .use("/", express.static("./client"));

    app.get("/wx", (req, res) => {;
        logRequest(req);
        res.end(checkSignature(req.query) ? req.query.echostr : 'signature fail');
    });
    app.post("/wx", (req, res) => {;
        logRequest(req);
        res.end('success');
    });
    app.get("/log", (req, res) => {
        res.send(log);
        res.end();
    });

    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
