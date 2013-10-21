var Backbone = require('todos/wyatt-backbone');

// Todo Model
// ----------

// Our basic **Todo** model has `title`, `order`, and `done` attributes.
module.exports = Backbone.Model.extend({

  // Default attributes for the todo item.
  defaults: function() {
    return {
      title: "empty todo...",
      order: 0,
      done: false
    };
  },

  // Toggle the `done` state of this todo item.
  toggle: function() {
    this.save({done: !this.get("done")});
  }

});
