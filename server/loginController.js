"use strict";

// https://api.weibo.com/oauth2/authorize?client_id=3313882064&response_type=code&redirect_uri=lannano.com/web


var key = "3313882064";
var redirectUrl = "lanzhiping.heroku.com";
var oauthAddress = "https://api.weibo.com/oauth2/authorize?client_id=CLIENTID&response_type=code&redirect_uri=REDIRECTURL";


function login(req, res, next) {
    if (!isLogined()) {
        res.redirect(getOauthAddress());
    }
}

function isLogined() {
    return false;
}

function getOauthAddress() {
    return oauthAddress.replace("CLIENTID", key).replace("REDIRECTURL", redirectUrl);
}

module.exports = login;
