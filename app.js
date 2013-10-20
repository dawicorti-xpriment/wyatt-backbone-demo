var Backbone = require('lib/wyatt-backbone');

var book = new Backbone.Model({id: 12});

book.fetch({success: function (book) {
	console.log(book);
}});