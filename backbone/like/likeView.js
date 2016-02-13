'use strict';
var app = app || {};

(function(Backbone){
	app.likeView = Backbone.View.extend({
		el:'#container',
		template: _templates['like_template'],
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template());
		}
	});

})(window.Backbone);