// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const _ = require('underscore');
const L = require('../leaflet.js');
const featuregroup = require('./FeatureGroup.js');

export class LeafletGeoJSONModel extends featuregroup.LeafletFeatureGroupModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeoJSONView',
      _model_name: 'LeafletGeoJSONModel',
      data: {},
      style: {},
      hover_style: {},
      point_style: {}
    };
  }
}

export class LeafletGeoJSONView extends featuregroup.LeafletFeatureGroupView {
  create_obj() {
    var that = this;
    var style = function(feature) {
      var model_style = that.model.get('style');
      return _.extend(feature.properties.style || {}, model_style);
    };

    var options = {
      style: style,
      onEachFeature: function(feature, layer) {
        var mouseevent = function(e) {
          if (e.type == 'mouseover') {
            layer.setStyle(that.model.get('hover_style'));
            layer.once('mouseout', function() {
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
        return new L.CircleMarker(latlng, point_style);
      };
    }

    this.obj = L.geoJson(this.model.get('data'), options);
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:style',
      function() {
        this.obj.setStyle(this.model.get('style'));
      },
      this
    );
    this.listenTo(
      this.model,
      'change:data',
      function() {
        this.map_view.obj.removeLayer(this.obj);
        this.create_obj();
        this.map_view.obj.addLayer(this.obj);
      },
      this
    );
  }
}
