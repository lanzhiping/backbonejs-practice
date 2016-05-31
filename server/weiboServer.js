"use strict";

var url = require("url"),
    fs = require("fs"),
    request = require("request"),
    loginUserAddress = "https://api.weibo.com/2/users/show.json",
    publicTimelineAddress = "https://api.weibo.com/2/statuses/public_timeline.json";

function urlFormat(path, query) {
    var urlObj = url.parse(path, true);

    urlObj.query = query;
    return url.format(urlObj);
}

function readSync() {
    var secretObj = fs.readFileSync("./db/secret.json", "utf8");
    return JSON.parse(
        secretObj || "{}"
    );
}

function getAccessToken(id) {
    return readSync()[id];
}

function loginUser(req, res, next) {
    request.get(urlFormat(loginUserAddress, {
        "uid": req.query.weibo_id,
        "access_token": getAccessToken(req.query.weibo_id)
    }), function(error, httpResponse, body) {
        res.write(body);
        res.end();
    });
}

function publicTimeline(req, res, next) {
    request.get(urlFormat(publicTimelineAddress, {
        "access_token": getAccessToken(req.query.weibo_id)
    }), function(error, httpResponse, body) {
        res.write(body.statuses);
        res.end();
    });
}

module.exports = {
    "loginUser": loginUser,
    "publicWeibo": publicTimeline
};