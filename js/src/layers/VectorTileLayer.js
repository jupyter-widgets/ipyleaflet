// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const layer = require('./Layer.js');

export class LeafletVectorTileLayerModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVectorTileLayerView',
      _model_name: 'LeafletVectorTileLayerModel',
      url: 'https://free-{s}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key={apiKey}',
      options: { apiKey : 'VrAl6k9W8JkD4G5584Sz' },
      attribution:
        'Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    };
  }
}

export class LeafletVectorTileLayerView extends layer.LeafletLayerView {
   create_obj() {
        this.obj = L.vectorGrid.protobuf(this.model.get('url'), this.model.get('options'));
        this.model.on('msg:custom', this.handle_message.bind(this));
    }

   model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:url',
      function() {
        this.obj.setUrl(this.model.get('url'), true);
        this.obj.refresh();
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
