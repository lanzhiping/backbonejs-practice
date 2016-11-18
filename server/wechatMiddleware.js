var wechat = require("wechat"),
    wechatApi = require('./wechatApi');

function noImplemented(message, req, res, next) {
    res.reply(`message type: ${message.MsgType}; message content: ${message.Content}`);
}

function textReplyer(message, req, res, next) {
    switch (message.Content) {
        case "会员卡":
            res.redirect("/sendMessage");
            break;
        default:
            res.reply(message.Content);
    };
}

function menuEvents(message, req, res, next) {
    switch (message.EventKey) {
        case "click": // send template
            res.redirect("/sendMessage");
            break;
        default:
            res.reply("event not impletemented yet");
    };
}

function wechatMiddleware(TOKEN) {
    return wechat(TOKEN)
        .text(textReplyer)
        .event(menuEvents)
        .link(noImplemented)
        .image(noImplemented)
        .voice(noImplemented)
        .video(noImplemented)
        .location(noImplemented)
        .middlewarify();
};

module.exports = wechatMiddleware;
