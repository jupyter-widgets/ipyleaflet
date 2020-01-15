// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const layer = require('./Layer.js');

export class LeafletRasterLayerModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletRasterLayerView',
      _model_name: 'LeafletRasterLayerModel',
      visible: true
    };
  }
}

export class LeafletRasterLayerView extends layer.LeafletLayerView {
  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:opacity',
      function() {
        if (this.model.get('visible')) {
          this.obj.setOpacity(this.model.get('opacity'));
        }
      },
      this
    );
    this.listenTo(
      this.model,
      'change:visible',
      function() {
        if (this.model.get('visible')) {
          this.obj.setOpacity(this.model.get('opacity'));
        } else {
          this.obj.setOpacity(0);
        }
      },
      this
    );

    if (this.model.get('visible')) {
      this.obj.setOpacity(this.model.get('opacity'));
    } else {
      this.obj.setOpacity(0);
    }
  }
}
