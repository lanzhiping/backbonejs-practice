"use strict";

var log = [],
    port = 8000,
    access_token,
    jsapi_ticket,
    TOKEN = "lanzhiping",
    MODE = "nano",
    appid = {
        test: "wx44daeec8e4a8e040",
        nano: "wx1299b897125b2916"
    },
    appSecret = {
        test: "4743f83378d95182ec9c942182e4992b",
        nano: "5ab13901227f689da3f0612c5bcd48e8"
    },
    config = {
        test: TOKEN,
        nano: {
            token: TOKEN,
            appid: appid[MODE],
            encodingAESKey: 'TvEa810kGtnfifCfYYE2jEI16cZWgI2sZXGkhDNC1I0'
        }
    },
    express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    getSignature = require('./server/sign'),
    sha1 = require('crypto').createHash('sha1'),
    httpServer = require("./server/httpServer"),
    wechatMiddleware = require("./server/wechatMiddleware");

function logRequest(type, text) {
    log.push({
        time: new Date(),
        type: type,
        message: JSON.stringify(text)
    });
}

function checkSignature(params){
    var key = [TOKEN, params.timestamp, params.nonce].sort().join('');

    sha1.update(key);
    return sha1.digest('hex') === params.signature;
}

function getAccessToken() {
    var query = [
            "grant_type=client_credential",
            "appid=" + appid[MODE],
            "secret=" + appSecret[MODE]
        ].join("&");

    return new Promise((resolve, reject) => {
        if (access_token) {
            resolve({access_token: access_token});
        } else {
            request({
                url: "https://api.weixin.qq.com/cgi-bin/token?" + query
            }, (err, response, body) => {
                access_token = JSON.parse(body).access_token;
                resolve(JSON.parse(body));
            })
        }
    });
}

function getTicket(data) {
    return new Promise((resolve, reject) => {
        if (jsapi_ticket) {
            resolve({jsapi_ticket: jsapi_ticket});
        } else {
            request({
                url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + data.access_token + "&type=jsapi"
            }, (err, response, body) => {
                jsapi_ticket = JSON.parse(body).ticket;
                resolve(JSON.parse(body));
            })
        }
    });
}

function sendMessage(openid, res) {
    request({
        url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`,
        method: "POST",
        json: {
            "touser": openid || "oqtMwv5X2VMo54IZDwmgmJB4SrcI",
            "template_id": "cH3KonJ--YNB0_hc2xeTGUhZJO20tp3FnvodLUiQy_A",
            "url": "http://weixin.qq.com/download",
            "data": {
                "first": {
                    "value": "恭喜你购买成功！",
                    "color":"#173177"
                },
                "keynote1": {
                    "value": "巧克力",
                    "color": "#173177"
                },
                "keynote2": {
                    "value": "39.8元",
                    "color": "#173177"
                },
                "keynote3": {
                    "value": "2014年9月22日",
                    "color": "#173177" },
                "remark":{
                    "value": "欢迎再次购买！",
                    "color": "#173177"
                }
            }
        }
    }, (err, httpResponse, body) => { res.end(JSON.stringify(body)); });
}

(function () {
    var app = express();

    app.use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use("/", express.static("./client"))
        .use("/wx", wechatMiddleware(config[MODE]))
        .get("/wx", (req, res) => {
            logRequest("req.query", req.query);
            logRequest("get /wx result", wechat.checkSignature(req.query, TOKEN) ? req.query.echostr : 'signature fail');
            res.end(wechat.checkSignature(req.query, TOKEN) ? req.query.echostr : 'signature fail');
        })
        .get("/log", (req, res) => {
            res.send(log);
            res.end();
        })
        .get("/cleanlog", (req, res) => {
            log = [];
            res.end("cleanlog");
        })
        .get("/cleanaccesstoken", (req, res) => {
            access_token = undefined;
            res.end("cleanaccesstoken");
        })
        .get("/cleanjsapiticket", (req, res) => {
            jsapi_ticket = undefined;
            res.end("cleanjsapiticket");
        })
        .get("/sendMessage", (req, res) => {
            if (!access_token && !jsapi_ticket) {
                res.redirect("getSignature");
            } else {
                sendMessage(req.query.openid, res);
            }
        })
        .get("/getSignature", (req, res) => {
            getAccessToken()
                .then(getTicket)
                .then((data) => {
                    logRequest("/getSignature", {jsapi_ticket: jsapi_ticket, access_token: access_token, messagetype: 'access_token'});
                    res.end(
                        JSON.stringify(getSignature(jsapi_ticket, "http://lanzhiping.herokuapp.com/")));});
        });

    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
