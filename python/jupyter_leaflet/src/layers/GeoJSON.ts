// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  GeoJSON,
  GeoJSONOptions,
  LeafletMouseEvent,
  StyleFunction,
} from 'leaflet';
import L from '../leaflet';

import {
  LeafletFeatureGroupModel,
  LeafletFeatureGroupView,
} from './FeatureGroup';

export class LeafletGeoJSONModel extends LeafletFeatureGroupModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeoJSONView',
      _model_name: 'LeafletGeoJSONModel',
      data: {},
      style: {},
      visible: true,
      hover_style: {},
      point_style: {},
    };
  }
}

export class LeafletGeoJSONView extends LeafletFeatureGroupView {
  obj: GeoJSON;

  create_obj() {
    const style: StyleFunction = (feature) => {
      const model_style = this.model.get('style');
      const feature_style = feature?.properties.style || {};
      return {
        ...feature_style,
        ...model_style,
      };
    };

    // Use get_options to trigger default option fetch behaviour
    let options = this.get_options() as L.GeoJSONOptions;

    const geojson_options: GeoJSONOptions = {
      style: style,
      onEachFeature: (feature, layer: GeoJSON) => {
        const mouseevent = (e: LeafletMouseEvent) => {
          if (e.type == 'mouseover') {
            layer.setStyle(this.model.get('hover_style'));
            layer.once('mouseout', () => {
              this.obj.resetStyle(layer);
            });
          }
          this.send({
            event: e.type,
            feature: feature,
            properties: feature.properties,
            id: feature.id,
            coordinates: [e.latlng.lat, e.latlng.lng],
          });
        };
        const pmIgnore = this.model.get('pm_ignore');
        if (pmIgnore !== undefined) {
          (layer as any).pmIgnore = pmIgnore;
            if (pmIgnore && layer.pm) {
              layer.pm.disable();
              delete (layer as any).pm;
            }
        }
        layer.on({
          mouseover: mouseevent,
          click: mouseevent,
        });
      },
    };

    options = { ...options, ...geojson_options };

    const point_style = this.model.get('point_style');

    if (Object.keys(point_style).length !== 0) {
      options.pointToLayer = function (feature, latlng) {
        return new L.CircleMarker(latlng, point_style);
      };
    }

    this.obj = L.geoJson(this.model.get('data'), options);
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:style', () => {
      this.obj.setStyle(this.model.get('style'));
    });
    this.listenTo(this.model, 'change:data', () => {
      this.obj.clearLayers();
      this.obj.addData(this.model.get('data'));
    });
    // TODO this "visible" toggle is misleading, it suggests that there is
    //  a visibility flag available in leaflet but actually it just doesn't add data.
    //  This can lead to wasteful usage since it's the same as simply not adding geojson data
    //  on the python side, except that in this case data will be transfered and then not used.
    this.listenTo(this.model, 'change:visible', () => {
      if (this.model.get('visible')) {
        this.obj.addData(this.model.get('data'));
      } else {
        this.obj.clearLayers();
      }
    });
  }
}
