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
      max_native_zoom: null
    };
  }
}

export class LeafletVectorTileLayerView extends LeafletLayerView {
  obj: VectorGrid.Protobuf;

  create_obj() {
    const options = {
      ...this.get_options(),
      rendererFactory: L.canvas.tile,
    };
    this.obj = L.vectorGrid.protobuf(this.model.get('url'), options);
    this.model.on('msg:custom', this.handle_message.bind(this));
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:url', () => {
      this.obj.setUrl(this.model.get('url'));
    });
  }

  handle_message(content: { msg: string }) {
    if (content.msg == 'redraw') {
      this.obj.redraw();
    }
  }
}
