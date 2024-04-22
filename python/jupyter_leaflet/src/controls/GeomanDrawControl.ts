import { unpack_models, WidgetView } from '@jupyter-widgets/base';
import { GeoJSON } from 'leaflet';
import L from '../leaflet';
import { LayerShapes } from '../definitions/leaflet-extend';
import { LeafletControlModel, LeafletControlView } from './Control';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

export class LeafletGeomanDrawControlModel extends LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeomanDrawControlView',
      _model_name: 'LeafletGeomanDrawControlModel',
      current_mode: null,
      hide_controls: false,
      data: [],
      marker: {},
      circlemarker: { pathOptions: {} },
      circle: {},
      polyline: { pathOptions: {} },
      rectangle: {},
      polygon: { pathOptions: {} },
      text: {},
      edit: true,
      drag: false,
      remove: true,
      cut: false,
      rotate: false,
    };
  }
}

LeafletGeomanDrawControlModel.serializers = {
  ...LeafletControlModel.serializers,
  layer: { deserialize: unpack_models },
};

export class LeafletGeomanDrawControlView extends LeafletControlView {
  feature_group: GeoJSON;
  controlOptions: { [option: string]: any };
  initialize(
    parameters: WidgetView.IInitializeParameters<LeafletControlModel>
  ) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.feature_group = L.geoJson([], {
      style: function (feature) {
        if (feature?.properties != undefined) {
          return feature.properties.style;
        } else {
          return {};
        }
      },
      pointToLayer: function (feature, latlng) {
        var options;
        if (feature.properties.style.textMarker) {
          options = {
            textMarker: feature.properties.style.textMarker,
            text: feature.properties.style.text,
          };
        } else {
          options = feature.properties.options;
        }
        switch (feature.properties.type) {
          case 'marker':
            return new L.Marker(latlng, options);
          case 'circle':
            return new L.Circle(
              latlng,
              feature.properties.style.radius,
              feature.properties.options
            );
          case 'circlemarker':
            return new L.CircleMarker(latlng, feature.properties.options);
          // Below might work funny sometimes?
          // TODO: Check
          default:
            return new L.Marker(latlng, options);
        }
      },
    });
    this.data_to_layers();
    this.map_view.obj.addLayer(this.feature_group);

    var position = this.model.get('position');

    var drawMarker = this.model.get('marker');
    if (!Object.keys(drawMarker).length) {
      drawMarker = false;
    } else {
      // For backwards compatibility
      if ('shapeOptions' in drawMarker) {
        drawMarker.markerOptions = drawMarker.shapeOptions;
        delete drawMarker.shapeOptions;
      }
      this.map_view.obj.pm.Draw.Marker.setOptions(drawMarker);
    }

    var drawCircleMarker = this.model.get('circlemarker');
    if (!Object.keys(drawCircleMarker).length) {
      drawCircleMarker = false;
    } else {
      if ('shapeOptions' in drawCircleMarker) {
        drawCircleMarker.pathOptions = drawCircleMarker.shapeOptions;
        delete drawCircleMarker.shapeOptions;
      }
      this.map_view.obj.pm.Draw.CircleMarker.setOptions(drawCircleMarker);
    }

    var drawCircle = this.model.get('circle');
    if (!Object.keys(drawCircle).length) {
      drawCircle = false;
    } else {
      if ('shapeOptions' in drawCircle) {
        drawCircle.pathOptions = drawCircle.shapeOptions;
        delete drawCircle.shapeOptions;
      }
      this.map_view.obj.pm.Draw.Circle.setOptions(drawCircle);
    }

    var drawPolyline = this.model.get('polyline');
    if (!Object.keys(drawPolyline).length) {
      drawPolyline = false;
    } else {
      if ('shapeOptions' in drawPolyline) {
        drawPolyline.pathOptions = drawPolyline.shapeOptions;
        delete drawPolyline.shapeOptions;
      }
      this.map_view.obj.pm.Draw.Line.setOptions(drawPolyline);
    }

    var drawRectangle = this.model.get('rectangle');
    if (!Object.keys(drawRectangle).length) {
      drawRectangle = false;
    } else {
      if ('shapeOptions' in drawRectangle) {
        drawRectangle.pathOptions = drawRectangle.shapeOptions;
        delete drawRectangle.shapeOptions;
      }
      this.map_view.obj.pm.Draw.Rectangle.setOptions(drawRectangle);
    }

    var drawPolygon = this.model.get('polygon');
    if (!Object.keys(drawPolygon).length) {
      drawPolygon = false;
    } else {
      if ('shapeOptions' in drawPolygon) {
        drawPolygon.pathOptions = drawPolygon.shapeOptions;
        delete drawPolygon.shapeOptions;
      }
      this.map_view.obj.pm.Draw.Polygon.setOptions(drawPolygon);
    }

    var drawText = this.model.get('text');
    if (!Object.keys(drawText).length) {
      drawText = false;
    }

    var editMode = this.model.get('edit');
    var dragMode = this.model.get('drag');
    var removalMode = this.model.get('remove');
    var cutMode = this.model.get('cut');
    var rotateMode = this.model.get('rotate');

    this.controlOptions = {
      position: position,
      drawMarker: !(drawMarker == false),
      drawCircleMarker: !(drawCircleMarker == false),
      drawCircle: !(drawCircle == false),
      drawPolyline: !(drawPolyline == false),
      drawRectangle: !(drawRectangle == false),
      drawPolygon: !(drawPolygon == false),
      drawText: !(drawText == false),
      editMode: editMode,
      dragMode: dragMode,
      removalMode: removalMode,
      cutPolygon: cutMode,
      rotateMode: rotateMode,
    };

    this.setMode();

    this.map_view.obj.on(
      'pm:create',
      (e: { shape: L.PM.SUPPORTED_SHAPES; layer: LayerShapes }) => {
        var layer = e.layer;
        this.send({
          event: 'pm:create',
          geo_json: this.layer_to_json(layer),
        });
        // Without this, the text layer will not be editable after creation. We only create the layer after
        // the text has been edited.
        if (e.shape === 'Text') {
          if (!layer.pm.enabled()) layer.pm.enable();
          layer.pm.focus();
          layer.on('pm:textblur', (e) => {
            this.send({
              event: 'pm:textchange',
              geo_json: this.layer_to_json(layer),
            });
            this.feature_group.addLayer(layer);
            this.layers_to_data();
            this.model.save_changes();
          });
          return;
        }
        this.feature_group.addLayer(layer);
        this.layers_to_data();
        this.model.save_changes();
      }
    );
    this.map_view.obj.on(
      'pm:remove',
      (e: { shape: L.PM.SUPPORTED_SHAPES; layer: LayerShapes }) => {
        var eventLayer = e.layer;
        this.feature_group.removeLayer(eventLayer);
        this.send({
          event: 'pm:remove',
          geo_json: this.layer_to_json(eventLayer),
        });
        this.layers_to_data();
      }
    );
    this.map_view.obj.on(
      'pm:cut',
      (e: {
        layer: LayerShapes;
        originalLayer: L.Layer;
        shape: L.PM.SUPPORTED_SHAPES;
      }) => {
        var eventLayer = e.layer;
        // since cut returns original layer and new layer, we treat it differently
        var geo_json = [];
        this.feature_group.eachLayer((layer) => {
          if (layer._leaflet_id == e.originalLayer._leaflet_id) {
            this.feature_group.removeLayer(layer);
          } else {
            geo_json.push(this.layer_to_json(layer));
          }
        });
        this.feature_group.addLayer(eventLayer);
        geo_json.push(this.layer_to_json(eventLayer));
        this.send({
          event: 'pm:cut',
          geo_json: geo_json,
        });
        this.layers_to_data();
      }
    );
    this.map_view.obj.on('pm:rotateend', (e: { layer: LayerShapes }) => {
      var eventLayer = e.layer;
      this.event_to_json('pm:rotateend', eventLayer);
      this.layers_to_data();
    });
    // add listeners for syncing modes
    this.map_view.obj.on(
      'pm:globaldrawmodetoggled',
      (e: { enabled: boolean; shape: L.PM.SUPPORTED_SHAPES }) => {
        if (
          e.enabled &&
          this.model.get('current_mode') != null &&
          this.model.get('current_mode').split(':')[0] != 'draw'
        ) {
          this.model.set('current_mode', 'draw:' + e.shape);
          this.setMode();
        }
      }
    );
    this.map_view.obj.on(
      'pm:globaleditmodetoggled',
      (e: { enabled: boolean; map: L.Map }) => {
        if (e.enabled && this.model.get('current_mode') != 'edit') {
          this.model.set('current_mode', 'edit');
          this.setMode();
        }
      }
    );
    this.map_view.obj.on(
      'pm:globaldragmodetoggled',
      (e: { enabled: boolean; map: L.Map }) => {
        if (e.enabled && this.model.get('current_mode') != 'drag') {
          this.model.set('current_mode', 'drag');
          this.setMode();
        }
      }
    );
    this.map_view.obj.on(
      'pm:globalremovalmodetoggled',
      (e: { enabled: boolean; map: L.Map }) => {
        if (e.enabled && this.model.get('current_mode') != 'remove') {
          this.model.set('current_mode', 'remove');
          this.setMode();
        }
      }
    );
    this.map_view.obj.on(
      'pm:globalcutmodetoggled',
      (e: { enabled: boolean; map: L.Map }) => {
        if (e.enabled && this.model.get('current_mode') != 'cut') {
          this.model.set('current_mode', 'cut');
          this.setMode();
        }
      }
    );
    this.map_view.obj.on(
      'pm:globalrotatemodetoggled',
      (e: { enabled: boolean; map: L.Map }) => {
        if (e.enabled && this.model.get('current_mode') != 'rotate') {
          this.model.set('current_mode', 'rotate');
          this.setMode();
        }
      }
    );
    this.model.on('change:current_mode', this.setMode.bind(this));
    this.model.on('msg:custom', this.handle_message.bind(this));
    this.model.on('change:data', this.data_to_layers.bind(this));
  }

  remove() {
    this.map_view.obj.pm.removeControls();
    this.map_view.obj.removeLayer(this.feature_group);
    this.map_view.obj.off('pm:create');
    this.map_view.obj.off('pm:remove');
    this.map_view.obj.off('pm:cut');
    this.map_view.obj.off('pm:rotateend');
    this.map_view.obj.off('moveend');
    this.model.off('msg:custom');
    this.model.off('change:data');
  }

  setMode() {
    var mode = this.model.get('current_mode');
    if (mode == null) {
      const currentShape = this.map_view.obj.pm.Draw.getActiveShape();
      if (currentShape) {
        this.map_view.obj.pm.disableDraw(currentShape);
      }
    } else if (mode.split(':').length > 1) {
      mode = mode.split(':')[1];
      this.map_view.obj.pm.enableDraw(mode, this.model.get(mode.toLowerCase()));
    } else if (mode == 'edit') {
      this.map_view.obj.pm.enableGlobalEditMode();
    } else if (mode == 'drag') {
      this.map_view.obj.pm.enableGlobalDragMode();
    } else if (mode == 'remove') {
      this.map_view.obj.pm.enableGlobalRemovalMode();
    } else if (mode == 'cut') {
      this.map_view.obj.pm.enableDraw('Cut');
    } else if (mode == 'rotate') {
      this.map_view.obj.pm.enableGlobalRotateMode();
    }
  }

  properties_type(layer: L.Layer) {
    switch (layer.constructor) {
      case L.Rectangle:
        return 'rectangle';
      case L.Circle:
        return 'circle';
      case L.CircleMarker:
        return 'circlemarker';
      case L.Polygon:
        return 'polygon';
      case L.Polyline:
        return 'polyline';
      case L.Marker:
        return 'marker';
    }
  }

  layer_to_json(layer: LayerShapes | L.Layer) {
    var geo_json = layer.toGeoJSON();
    if (geo_json.properties == undefined) {
      geo_json.properties = {};
    }
    geo_json.properties.style = layer.options;
    geo_json.properties.type = this.properties_type(layer);
    return geo_json;
  }

  event_to_json(eventName: string, eventLayer: LayerShapes | L.Layer) {
    var geo_json: GeoJSON[] = [];
    this.feature_group.eachLayer((layer) => {
      if (layer._leaflet_id == eventLayer._leaflet_id) {
        geo_json.push(this.layer_to_json(eventLayer));
      } else {
        geo_json.push(this.layer_to_json(layer));
      }
    });
    this.send({
      event: eventName,
      geo_json: geo_json,
    });
  }

  data_to_layers() {
    const data = this.model.get('data');
    this.feature_group.clearLayers();
    this.feature_group.addData(data);
    // We add event listeners here, since these need to be added on a
    // per-layer basis.
    this.feature_group.eachLayer((layer) => {
      layer.on('pm:vertexadded', (e: { layer: L.Layer }) => {
        var eventLayer = e.layer;
        this.event_to_json('pm:vertexadded', eventLayer);
        this.layers_to_data();
      });
      layer.on('pm:vertexremoved', (e) => {
        var eventLayer = e.layer;
        this.event_to_json('pm:vertexremoved', eventLayer);
        this.layers_to_data();
      });
      layer.on('pm:markerdragend', (e) => {
        var eventLayer = e.layer;
        this.event_to_json('pm:vertexdrag', eventLayer);
        this.layers_to_data();
      });
      layer.on('pm:dragend', (e) => {
        var eventLayer = e.layer;
        this.event_to_json('pm:drag', eventLayer);
        this.layers_to_data();
      });
      layer.on('pm:textblur', (e) => {
        var eventLayer = e.layer;
        this.event_to_json('pm:textchange', eventLayer);
        this.layers_to_data();
      });
    });
  }

  layers_to_data() {
    let newData: GeoJSON[] = [];
    this.feature_group.eachLayer((layer) => {
      if (layer._pmTempLayer) {
        this.feature_group.removeLayer(layer);
      } else {
        const geoJson = layer.toGeoJSON();
        if (geoJson.properties == undefined) {
          geoJson.properties = {};
        }
        // Sanitize layer options for serialization via `structuredClone`:
        // https://web.dev/structured-clone/#features-and-limitations
        const sanitizedLayerOptions = JSON.parse(JSON.stringify(layer.options));
        geoJson.properties.style = sanitizedLayerOptions;
        geoJson.properties.type = this.properties_type(layer);
        newData.push(geoJson);
      }
    });
    this.model.set('data', newData);
    this.model.save_changes();
  }

  handle_message(content: { msg: string }) {
    switch (content.msg) {
      case 'clear': {
        this.feature_group.eachLayer((layer) => {
          this.feature_group.removeLayer(layer);
        });
        break;
      }
      case 'clear_polygons': {
        this.feature_group.eachLayer((layer) => {
          if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
      case 'clear_polylines': {
        this.feature_group.eachLayer((layer) => {
          if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
      case 'clear_circles': {
        this.feature_group.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
      case 'clear_circle_markers': {
        this.feature_group.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker && !(layer instanceof L.Circle)) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
      case 'clear_rectangles': {
        this.feature_group.eachLayer((layer) => {
          if (layer instanceof L.Rectangle) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
      case 'clear_markers': {
        this.feature_group.eachLayer((layer) => {
          if (
            (layer instanceof L.Marker && !layer.options.textMarker) ||
            layer instanceof L.CircleMarker
          ) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
      case 'clear_text': {
        this.feature_group.eachLayer((layer) => {
          if (layer instanceof L.Marker && layer.options.textMarker) {
            this.feature_group.removeLayer(layer);
          }
        });
        break;
      }
    }
    this.layers_to_data();
  }
}
