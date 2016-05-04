"use strict";

var IconButtonView,
    Marionette = require("backbone.marionette");

IconButtonView = Marionette.ItemView.extend({
    tagName:"i",

    className:"iconfont",

    events: {
        "click": onClick
    },

    onRender: function (classString) {
        this.$el.addClass(classString);
    },

    initialize: function (options) {
        this.clickCallback = this.options.clickCallback;
        this.classString = this.options.classString;

        // options.toggleClass && this.toggleClass(options.toggleClass);
    },

    onClick: function() {
        this.clickCallback();
    }

    // toggleClass: function(args){
    //     args[3][args[2]]
    //     ? this.$el.removeClass(args[1]).addClass(args[0])
    //     : this.$el.removeClass(args[0]).addClass(args[1]);

    //     this.listenTo(args[3], "change:" + args[2],
    //         function(routeName){
    //             args[3][args[2]]
    //             ? this.$el.removeClass(args[1]).addClass(args[0])
    //             : this.$el.removeClass(args[0]).addClass(args[1]);
    //         }
    //     );
    // }
});

module.exports = IconButtonView;
