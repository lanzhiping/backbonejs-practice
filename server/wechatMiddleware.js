var wechat = require("wechat");

function noImplemented(message, req, res, next) {
    res.reply(`message type: ${message.MsgType}; message content: ${message.Content}`);
}

function wechatMiddleware(TOKEN) {
    return wechat(TOKEN)
        .text((message, req, res, next) => {
            switch (message.Content) {
                case "会员卡":
                    res.redirect("/sendMessage");
                    break;
                default:
                    res.reply(message.Content);
            }
        })
        .link(noImplemented)
        .image(noImplemented)
        .voice(noImplemented)
        .video(noImplemented)
        .event(noImplemented)
        .location(noImplemented)
        .middlewarify();
};

module.exports = wechatMiddleware;
