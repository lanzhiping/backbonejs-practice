
(function () {
	'use strict';


	var model = Backbone.Model.extend({
		showBorder: function () {
			this.set({ border: 'solid 1px' });
		}
	});


	var pEl = Backbone.View.extend({
		tagName: 'p',
		id: 'my-p-el',
		className: 'my-p-el',
		initialize: function () {
			setText(this, 'this is my first backbone element');
			$('body').append(this.el);
		}
	});

	
	


	var buttonE = Backbone.View.extend({
		tagName: 'button',
		render: function () { $('body').append(this.el) },
		initialize: function (text) {
			this.render();
			setText(this, text);
		},
		events: {
			"click": function () { setBorder(p); setText(p, 'again this is my first backbone element'); }
		}
	});


	var p = new pEl();
	var button = new buttonE('set border');

	

	function setBorder(view) {
		view.$el.css('border','solid 1px blue');
	}

	function setText(view, text) {
		view.$el.text(text);
	}

})();

