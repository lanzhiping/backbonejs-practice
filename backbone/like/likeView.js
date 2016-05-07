"use strict";

var LikeView,
    $ = require("jquery"),
    _templates = require("templates"),
    Marionette = require("backbone.marionette");

LikeView = Marionette.ItemView.extend({
    container: $("#container"),
    template: _templates["like/like_template"],
    initialize: function(){
        this.render();
    },
    render: function(){
        this.setElement(this.template());
        this.container.html(this.el);
    }
});

module.exports = LikeView;
