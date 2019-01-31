var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var polygon = require('./Polygon.js');

var LeafletRectangleModel = polygon.LeafletPolygonModel.extend({
    defaults: _.extend({}, polygon.LeafletPolygonModel.prototype.defaults, {
        _view_name : 'LeafletRectangleView',
        _model_name : 'LeafletRectangleModel',
        bounds : []
    })
});
var LeafletRectangleView = polygon.LeafletPolygonView.extend({
    create_obj: function () {
        this.obj = L.rectangle(
            this.model.get('bounds'),
            this.get_options()
        );
    },
});
module.exports = {
  LeafletRectangleView : LeafletRectangleView,
  LeafletRectangleModel : LeafletRectangleModel,
};
