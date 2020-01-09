// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');

var LeafletAwesomeIconModel = layer.LeafletUILayerModel.extend({
    defaults: _.extend({}, layer.LeafletUILayerModel.prototype.defaults, {
        _view_name :'LeafletAwesomeIconView',
        _model_name : 'LeafletAwesomeIconModel',
        name: 'home',
        marker_color: 'blue',
        icon_color: 'blue',
        spin: false
    })
});

var LeafletAwesomeIconView = layer.LeafletUILayerView.extend({

    create_obj: function () {
        this.obj = L.AwesomeMarkers.icon({
            prefix: 'fa',
            icon: this.model.get('name'),
            markerColor: this.model.get('marker_color'),
            iconColor: this.model.get('icon_color'),
            spin: this.model.get('spin')
        });
    }

});

module.exports = {
  LeafletAwesomeIconView : LeafletAwesomeIconView,
  LeafletAwesomeIconModel : LeafletAwesomeIconModel,
};
