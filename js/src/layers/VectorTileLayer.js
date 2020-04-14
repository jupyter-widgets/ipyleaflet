// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const layer = require('./Layer.js');

export class LeafletVectorTileLayerModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVectorTileLayerView',
      _model_name: 'LeafletVectorTileLayerModel',
      url: '',
      vectorTileLayerStyles: {},
    };
  }
}

export class LeafletVectorTileLayerView extends layer.LeafletLayerView {
   create_obj() {
        var options = {
            ...this.get_options(),
            rendererFactory: L.canvas.tile,
            }
        this.obj = L.vectorGrid.protobuf(this.model.get('url'), options);
        this.model.on('msg:custom', this.handle_message.bind(this));
    }

   model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:url',
      function() {
        this.obj.setUrl(this.model.get('url'));
      },
      this
    );
  }

  handle_message(content) {
    if (content.msg == 'redraw') {
      this.obj.redraw();
    }
  }
}
