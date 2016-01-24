
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
		className:'my-p-el'
	});

	var p = new pEl(new model());
	window.test = p;
	$('body').append(p.el)

	var button = new Backbone.View({
		tagName: 'button',
		render: function () { $('body').append(this.el); },
		initialize: function () {
			this.render();
			console.log('inited button', this)
		}
	});
	button.$el.text('setBorder')
	
})();

