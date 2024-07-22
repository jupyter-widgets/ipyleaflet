// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { LeafletMouseEvent, VectorGrid } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';

export class LeafletVectorTileLayerModel extends LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVectorTileLayerView',
      _model_name: 'LeafletVectorTileLayerModel',
      url: '',
      vectorTileLayerStyles: {},
      min_zoom: 0,
      max_zoom: 18,
      min_native_zoom: null,
      max_native_zoom: null,
      interactive: false,
      visible: true,
      opacity: 1.0,
      rendererFactory: L.svg.tile,
      getFeatureId: null,
    };
  }
}

export class LeafletVectorTileLayerView extends LeafletLayerView {
  obj: VectorGrid.Protobuf;

  async set_vector_tile_layer_styles(options: any) {
    if ('layerStyles' in options) {
      let x: any = options['layerStyles'];
      options['vectorTileLayerStyles'] = x;
      if (typeof x === 'string') {
        try {
          let blobCode = `const jsStyle=${x}; export { jsStyle };`;

          const blob = new Blob([blobCode], { type: 'text/javascript' });
          const url = URL.createObjectURL(blob);
          const module = await import(/* webpackIgnore: true*/ url);
          const jsStyle = module.jsStyle;

          options['vectorTileLayerStyles'] = jsStyle;
        } catch (error) {
          options['vectorTileLayerStyles'] = {};
        }
      }
    }
    return options;
  }

  async create_obj() {
    let options = {
      ...this.get_options(),
    };

    if ('featureId' in options) {
      let idVar = options['featureId'];
      options['getFeatureId'] = function (feat: any) {
        return feat.properties[idVar];
      };
    }

    if ('renderer' in options) {
      let r: any = options['renderer'];
      if (r === 'canvas') {
        options['rendererFactory'] = L.canvas.tile;
      } else {
        options['rendererFactory'] = L.svg.tile;
      }
    }

    options = await this.set_vector_tile_layer_styles(options);

    this.obj = L.vectorGrid.protobuf(this.model.get('url'), options);
    this.model.on('msg:custom', this.handle_message.bind(this));

    if (this.model.get('visible') == false) {
      this.obj.setOpacity(0);
    }

    this.model.on('change:layer_styles', async () => {
      let options = {
        ...this.get_options(),
      };
      options = await this.set_vector_tile_layer_styles(options);
      this.obj.options.vectorTileLayerStyles = options['vectorTileLayerStyles'];
      if (this.model.get('visible') == false) {
        this.obj.setOpacity(0);
      }
      this.obj.redraw();
    });

    this.model.on('change:feature_style', () => {
      const feature_style = this.model.get('feature_style');
      const reset = feature_style['reset'];
      if (reset) {
        this.obj.resetFeatureStyle(feature_style['id']);
      } else {
        this.obj.setFeatureStyle(
          feature_style['id'],
          feature_style['layerStyle']
        );
      }
    });

    this.obj.on(
      'click mouseover mouseout' as any,
      (event: LeafletMouseEvent) => {
        this.send({
          event: 'interaction',
          type: event.type,
          coordinates: [event.latlng.lat, event.latlng.lng],
          properties: event.propagatedFrom.properties,
          options: event.propagatedFrom.options,
        });
      }
    );
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:url', () => {
      this.obj.setUrl(this.model.get('url'));
    });
    this.listenTo(this.model, 'change:opacity', () => {
      if (this.model.get('visible')) {
        this.obj.setOpacity(this.model.get('opacity'));
      }
    });
    this.listenTo(this.model, 'change:visible', () => {
      if (this.model.get('visible')) {
        this.obj.setOpacity(this.model.get('opacity'));
      } else {
        this.obj.setOpacity(0);
      }
    });
  }

  handle_message(content: { msg: string }) {
    if (content.msg == 'redraw') {
      this.obj.redraw();
    }
  }
}
