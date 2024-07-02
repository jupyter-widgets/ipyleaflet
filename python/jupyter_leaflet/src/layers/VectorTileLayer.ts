// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { VectorGrid } from 'leaflet';
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
      renderer_factory: 'svg',
      get_feature_id: null
    };
  }
}

export class LeafletVectorTileLayerView extends LeafletLayerView {
  obj: VectorGrid.Protobuf;

  async create_obj() {
    let options = {
      ...this.get_options(),
    };

    if ('getFeatureId' in options) {
      let idVar = options['getFeatureId'];
      options['getFeatureId'] = function (feat: any) {
        return feat.properties[idVar];
      };
    }

    let r: any = options['rendererFactory'];

    if (r === 'canvas') {
      options['rendererFactory'] = L.canvas.tile;
    } else {
      options['rendererFactory'] = L.svg.tile;
    }

    let x: any = options['vectorTileLayerStyles'];
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

    this.obj = L.vectorGrid.protobuf(this.model.get('url'), options);
    this.model.on('msg:custom', this.handle_message.bind(this));

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
