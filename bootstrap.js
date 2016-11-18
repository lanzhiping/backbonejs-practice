"use strict";

var log = [],
    port = 8000,
    access_token,
    jsapi_ticket,
    homePage = "",
    wechatConfig = require("./server/wechatConfig"),
    TOKEN = wechatConfig.TOKEN,
    MODE = wechatConfig.MODE,
    appid = wechatConfig.appid,
    appSecret = wechatConfig.appSecret,
    config = wechatConfig.config,
    express = require("express"),
    bodyParser = require("body-parser"),
    wechatData = require("./server/wechatData"),
    wechatApi = require('./server/wechatApi'),
    httpServer = require("./server/httpServer"),
    wechatMiddleware = require("./server/wechatMiddleware");

function logRequest(type, text) {
    log.push({
        time: new Date(),
        type: type,
        message: JSON.stringify(text)
    });
}

(function () {
    var app = express();

    app.use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use("/", (req, res, next) => {
            express.static(`./${homePage || "wechatlogin"}`)(req, res, next);
        })
        .use("/wx", wechatMiddleware(config[MODE]))
        .get("/wx", (req, res) => {
            logRequest("req.query", req.query);
            logRequest("get /wx result", wechat.checkSignature(req.query, TOKEN) ? req.query.echostr : 'signature fail');
            res.end(wechat.checkSignature(req.query, TOKEN) ? req.query.echostr : 'signature fail');
        })
        .get("/wechatlogin", (req, res) => {
            homePage = req.query.firstname + req.query.lastname === TOKEN ? "wechatmanage" : "wechatlogin";
            setTimeout(() => { homePage = ""; }, 1000 * 60 * 30);
            res.redirect("/");
        })
        .get("/log", (req, res) => {
            res.send(log);
            res.end();
        })
        .get("/cleanlog", (req, res) => {
            log = [];
            res.end("cleanlog");
        })
        .get("/getMenu", (req, res, nex) => {
            wechatApi.getMenu((err, data, response) => {
                res.end(JSON.stringify(data));
            });
        })
        .get("/removeMenu", (req, res, nex) => {
            wechatApi.removeMenu((err, data, response) => {
                res.end(JSON.stringify(data));
            });
        })
        .get("/getMenuConfig", (req, res, nex) => {
            wechatApi.getMenuConfig((err, data, response) => {
                res.end(JSON.stringify(data));
            });
        })
        .post("/createMenu", (req, res, nex) => {
            wechatApi.createMenu(wechatData.menuData, (err, data, response) => {
                res.end(JSON.stringify(data));
            });
        });

    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
