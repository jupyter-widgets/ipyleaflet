var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('leaflet');
require('Layer.js')


// Model

var LeafletIconModel = LeafletUILayerModel.extend({
    defaults: _.extend({}, LeafletUILayerModel.prototype.defaults, {
        _view_name :'LeafletIconView',
        _model_name : 'LeafletIconModel',
        icon_url: "",
        shadow_url: "",
        icon_size :  [10, 10],
        shadow_size :  [10, 10],
        icon_anchor: [0, 0],
        shadow_anchor: [0, 0],
        popup_anchor: [0, 0]
    })
});

// View

var LeafletIconView = LeafletUILayerView.extend({

    create_obj: function () {
        this.obj = L.icon(this.get_options());
    },

});


module.exports = {
  //views
  LeafletIconView : LeafletIconView,

  //models
  LeafletIconModel : LeafletIconModel,
};
