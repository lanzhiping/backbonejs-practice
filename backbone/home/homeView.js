'use strict';

var app = app || {};

(function(Backbone){

	app.homeView = Backbone.View.extend({
		el:'#container',
		template: _templates['home_template'],
		initialize: function(){ this.render(); },
		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

})(window.Backbone);