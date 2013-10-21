var _ = require('tipis/underscore');
var Backbone = require('tipis/backbone');
var wyatt = require('tipis/wyatt');
var manager = require('com.obscure.titouchdb').databaseManager;
var db = manager.createDatabaseNamed('todos');

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

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

  model.id = model.id || guid();
	var doc = db.documentWithID(model.id);

	if (_.contains(['create', 'update'], method) && model instanceof Backbone.Model) {

    var result = doc.putProperties(model.toJSON());
		if (result.error) {
      if (options.error) options.error(result.error);
		} else {
			if (options.success) options.success(doc.userProperties);
		}
    } else if (method === 'read' && _.isFunction(options.success) && model instanceof Backbone.Model) {
        options.success(doc.properties);
	} else if (method === 'read' && _.isFunction(options.success) && model instanceof Backbone.Collection) {
    var collection = model
      , query = db.queryAllDocuments()
      , rows = query.rows()
      , row
      , models = [];
    while (row = rows.nextRow()) {
      var instance = collection.create(row.document.userProperties);
      instance.id = row.documentID;
      models.push(instance);
    }

    if (options.success) options.success(models);
	}
};

module.exports = Backbone;