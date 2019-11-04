var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var featuregroup = require('./FeatureGroup.js')

var LeafletGeoJSONModel = featuregroup.LeafletFeatureGroupModel.extend({
    defaults: _.extend({}, featuregroup.LeafletFeatureGroupModel.prototype.defaults, {
        _view_name : 'LeafletGeoJSONView',
        _model_name : 'LeafletGeoJSONModel',
        data : {},
        style : {},
        hover_style : {},
        point_style : {},
    })
});

var LeafletGeoJSONView = featuregroup.LeafletFeatureGroupView.extend({
    create_obj: function () {
        var that = this;
        var style = function (feature) {
            var model_style = that.model.get('style');
            return _.extend(feature.properties.style || {}, model_style);
        }

        var options = {
            style: style,
            onEachFeature: function (feature, layer) {
                var mouseevent = function (e) {
                    if (e.type == 'mouseover') {
                        layer.setStyle(that.model.get('hover_style'));
                        layer.once('mouseout', function () {
                            that.obj.resetStyle(layer);
                        });
                    }
                    that.send({
                        event: e.type,
                        feature: feature,
                        properties: feature.properties,
                        id: feature.id
                    });
                };
                layer.on({
                    mouseover: mouseevent,
                    click: mouseevent
                });
            }
        };

        var point_style = that.model.get('point_style');

        if (Object.keys(point_style).length !== 0) {
            options.pointToLayer = function(feature, latlng) {
                return new L.CircleMarker(latlng, point_style)
            }
        }

        this.obj = L.geoJson(this.model.get('data'), options);
    },

    model_events: function () {
        this.listenTo(this.model, 'change:style', function () {
            this.obj.setStyle(this.model.get('style'));
        }, this);
        this.listenTo(this.model, 'change:data', function () {
            this.map_view.obj.removeLayer(this.obj);
            this.create_obj();
            this.map_view.obj.addLayer(this.obj);
        }, this);
    },
});

module.exports = {
  LeafletGeoJSONView : LeafletGeoJSONView,
  LeafletGeoJSONModel : LeafletGeoJSONModel,
};
