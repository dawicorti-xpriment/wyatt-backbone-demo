var _ = require('tipis/underscore');
var Backbone = require('tipis/backbone');
var wyatt = require('tipis/wyatt');


exports.View = Backbone.View.extend({
    type: 'View',

    _ensureElement: function () {
        if (!this.el) {
            this.yat = wyatt.yat({'@type': 'View'});
            this.$el = this.yat.first({type: 'View'});
            this.el = this.$el.ui;
        }
    }

});