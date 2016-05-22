"use strict";

var url = require("url"),
    fs = require("fs"),
    request = require("request"),
    client_id = "3313882064",
    secret = "99127d065aff697b4a7bcfbc9da1db8e",
    redirectUrl = "lanzhiping.herokuapp.com/api/login",
    oauthAddress = "https://api.weibo.com/oauth2/authorize",
    tokenAddress = "https://api.weibo.com/oauth2/access_token";


function urlFormat(path, query) {
    var urlObj = url.parse(path, true);

    urlObj.query = query;
    return url.format(urlObj);
}

function login(req, res, next) {
    if (!!req.query.code) {
        _getToken(req.query.code).then(function(data) {
            writeSync(data.uid, data.access_token);
            req.session.weibo_id = data.uid;
            res.redirect("/login");
        });
    } else if (!isLogined(req)) {
        res.redirect(_getOauthAddress());
    }
}

function isLogined(req) {
    var secretObj = readSync();
    return req.session.weibo_id !==undefined &&
           secretObj[req.session.weibo_id] !== undefined;
}

function _getOauthAddress() {
    return urlFormat(oauthAddress, {
        "client_id": client_id,
        "redirect_uri": redirectUrl
    });
}

function _getTokenAddress(code) {
    return urlFormat(tokenAddress, {
        "client_id": client_id,
        "client_secret": secret,
        "redirect_uri": redirectUrl,
        "code": code,
        "grant_type": "authorization_code"
    });
}

function _getToken(code) {
    return new Promise(function(resolve, reject) {
        request.post(_getTokenAddress(code), function(err, httpResponse, body) {
            resolve(JSON.parse(body));
        });
    });
}

function readSync() {
    var secretObj = fs.readFileSync("./db/secret.json", "utf8");
    return JSON.parse(
        secretObj || "{}"
    );
}

function writeSync(id, token) {
    var secretObj = readSync();
    secretObj[id] = token;
    fs.writeFileSync("./db/secret.json", JSON.stringify(secretObj), "utf8");
}

module.exports = {
    "login": login,
    "isLogined": isLogined,
    "_getOauthAddress": _getOauthAddress,
    "_getToken": _getToken
};
