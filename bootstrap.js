"use strict";

var log = [],
    port = 8000,
    TOKEN = "lanzhiping",
    appid = "wx44daeec8e4a8e040",
    appSecret = "4743f83378d95182ec9c942182e4992b",
    express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    getSignature = require('./server/sign'),
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
    app.get("/getSignature", (req, res) => {
        var query = [
                "grant_type=client_credential",
                "appid=" + appid,
                "secret=" + appSecret
            ].join("&");

        request({
            url: "https://api.weixin.qq.com/cgi-bin/token?" + query,
        }, (err, response, body) => {
            request({
                url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" +body.access_token+ "&type=jsapi"
            }, (err, response, body) => {
                res.end(
                    JSON.stringify(
                        getSignature(body.ticket, "http://lanzhiping.herokuapp.com/")));
            })
        })
    });


    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
