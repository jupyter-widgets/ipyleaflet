var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var polyline = require('./Polyline.js');

var LeafletPolygonModel = polyline.LeafletPolylineModel.extend({
    defaults: _.extend({}, polyline.LeafletPolylineModel.prototype.defaults, {
        _view_name : 'LeafletPolygonView',
        _model_name : 'LeafletPolygonModel'
    })
});
var LeafletPolygonView = polyline.LeafletPolylineView.extend({
    create_obj: function () {
        this.obj = L.polygon(
            this.model.get('locations'),
            this.get_options()
        );
    },
});
module.exports = {
  LeafletPolygonView : LeafletPolygonView,
  LeafletPolygonModel : LeafletPolygonModel,
};
