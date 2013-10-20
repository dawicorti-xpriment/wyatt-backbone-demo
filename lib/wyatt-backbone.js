var _ = require('tipis/underscore');
var Backbone = require('tipis/backbone');
var wyatt = require('tipis/wyatt');
var manager = require('com.obscure.titouchdb').databaseManager;
var db = manager.createDatabaseNamed('todos');

Backbone.View.prototype.type = 'View';

Backbone.View.prototype._ensureElement = function () {
    if (!this.el) {
        this.yat = wyatt.yat({'@type': 'View'});
        this.$el = this.yat.first({type: 'View'});
        this.el = this.$el.ui;
    }
};

Backbone.sync = function(method, model, options) {
	options = options || {};
	var doc = db.documentWithID(model.get('id'));

	if (_.contains(['save', 'update'], method)) {
		var result = doc.putProperties(model.toJSON());
		if (result.error && _.isFunction(options.error)) {
			options.error(result.error);
		} else if (_.isFunction(options.success)){
			options.success(doc.userProperties);
		}
	} else if (method === 'read' && _.isFunction(options.success)) {
		options.success(doc.userProperties);
	}
};

module.exports = Backbone;