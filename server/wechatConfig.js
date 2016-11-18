"use strict";

var MODE = "test",
    TOKEN = "lanzhiping",
    appid = {
        test: "wx44daeec8e4a8e040",
        nano: "wx1299b897125b2916"
    },
    appSecret = {
        test: "4743f83378d95182ec9c942182e4992b",
        nano: "5ab13901227f689da3f0612c5bcd48e8"
    };

var wechatConfig = {
    MODE: MODE,
    TOKEN: TOKEN,
    appid: appid[MODE],
    appSecret: appSecret[MODE],
    config: {
        test: TOKEN,
        nano: {
            token: TOKEN,
            appid: appid[MODE],
            encodingAESKey: 'TvEa810kGtnfifCfYYE2jEI16cZWgI2sZXGkhDNC1I0'
        }
    }
};

module.exports = wechatConfig;
