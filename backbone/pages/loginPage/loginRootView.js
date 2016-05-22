var LoginRootView,
    LoginView = require("loginView"),
    Marionette = require("backbone.marionette");

LoginRootView = Marionette.LayoutView.extend({
    el: "body",

    template: false,

    regions: {
        container: "#container"
    },

    onRender: function() {
        this.initializeLoginView();
    },

    initializeLoginView: function() {
        this.loginView = new LoginView();
        this.showChildView("container", this.loginView);
    }
});

module.exports = LoginRootView;
