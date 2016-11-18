"use strict";

var wechatConfig = require("./wechatConfig"),
    appid = wechatConfig.appid,
    appSecret = wechatConfig.appSecret,
    WechatApiProvider = require('wechat-api'),
    wechatApi = new WechatApiProvider(appid, appSecret);

module.exports = wechatApi;
