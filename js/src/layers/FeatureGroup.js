// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layergroup = require('./LayerGroup.js')

var LeafletFeatureGroupModel = layergroup.LeafletLayerGroupModel.extend({
    defaults: _.extend({}, layergroup.LeafletLayerGroupModel.prototype.defaults, {
        _view_name : 'LeafletFeatureGroupView',
        _model_name : 'LeafletFeatureGroupModel'
    })
});

var LeafletFeatureGroupView = layergroup.LeafletLayerGroupView.extend({
    create_obj: function () {
        this.obj = L.featureGroup();
    },
});

module.exports = {
  LeafletFeatureGroupView : LeafletFeatureGroupView,
  LeafletFeatureGroupModel : LeafletFeatureGroupModel,
};
