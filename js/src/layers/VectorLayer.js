// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');

var LeafletVectorLayerModel = layer.LeafletLayerModel.extend({
    defaults: _.extend({}, layer.LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletVectorLayerView',
        _model_name : 'LeafletVectorLayerModel'
    })
});

var LeafletVectorLayerView = layer.LeafletLayerView.extend({
});

module.exports = {
  LeafletVectorLayerView : LeafletVectorLayerView,
  LeafletVectorLayerModel : LeafletVectorLayerModel,
};
