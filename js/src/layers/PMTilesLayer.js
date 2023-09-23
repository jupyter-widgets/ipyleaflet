// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const layer = require('./Layer.js');

export class LeafletPMTilesLayerModel extends layer.LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPMTilesLayerView',
            _model_name: 'LeafletPMTilesLayerModel',
            url: '',
            style: {},
        };
    }
}

export class LeafletPMTilesLayerView extends layer.LeafletLayerView {
    render() {
        this.create_obj();
        this.listenTo(this.model, 'change:url', this.url_changed.bind(this));
        this.listenTo(this.model, 'change:style', this.style_changed.bind(this));
    }

    create_obj() {
        this.obj = L.protomapsL.leafletLayer({url:this.model.get('url')})
    }

    model_events() {
        super.model_events();
        this.listenTo(
          this.model,
          'change:url',
          function () {
            this.obj.setUrl(this.model.get('url'));
          },
          this
        );
      }

    style_changed() {
        this.obj.setStyle(this.model.get('style'));
    }
}
