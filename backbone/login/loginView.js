'use strict';

var app = app || {};

(function(Backbone){

	app.loginView = Backbone.View.extend({
		el: $("#container"),
		events: {'click #signIn': 'signIn'},
		initialize: function(){
			this.listenTo(app.router, 'change:isLogined', function(){
				app.router.isLogined && this.$el.hide();
			});
			this.render();
		},

		render: function(){
			var template = _templates['login_template']();
			this.$el.html( template );
			return this;
			//A good convention is to return this at the end of render to enable chained calls.
		},

		signIn: function(){
			var firstname = this.$('input[name="fname"]').val(),
				lastname = this.$('input[name="lname"]').val();
			app.router.isLogined = firstname === 'zhiping' && lastname === 'lan';
			app.router.trigger('change:isLogined');

			var fiveMinutes = 3000;
			//setTimeout(function(){app.router.isLogined = false}, fiveMinutes);
		}
	});

})(window.Backbone);