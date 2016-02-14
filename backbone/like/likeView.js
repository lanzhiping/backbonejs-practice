'use strict';
var app = app || {};

(function(Backbone){
	app.likeView = Backbone.View.extend({
		container: $('#container'),
		template: _templates['like_template'],
		initialize: function(){
			this.render();
		},
		render: function(){
			this.setElement(this.template());
			this.container.html(this.el);
		}
	});

})(window.Backbone);