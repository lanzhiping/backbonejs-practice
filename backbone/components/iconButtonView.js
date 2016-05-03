"use strict";

var IconButtonView,
    Marionette = require("backbone.marionette");

IconButtonView = Marionette.ItemView.extend({
    tagName:"i",

    className:"iconfont",

    events: {
        "click": "onClick"
    },

    onRender: function (classString) {
        this.$el.addClass(classString);
    },

    initialize: function (options) {
        this.clickCallback = this.options.clickCallback;
        this.classString = this.options.classString;
    },

    onClick: function() {
        this.clickCallback();
    }
});

module.exports = IconButtonView;
