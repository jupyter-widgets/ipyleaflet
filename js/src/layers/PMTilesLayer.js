// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const layer = require('./Layer.js');
const protomapsL = require('protomaps-leaflet');

export class LeafletPMTilesLayerModel extends layer.LeafletLayerModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletPMTilesLayerView',
            _model_name: 'LeafletPMTilesLayerModel',
            url: '',
            attribution: '',
            style: {},
        };
    }
}

export class LeafletPMTilesLayerView extends layer.LeafletLayerView {
    create_obj() {
      var options = {
        ...this.get_options(),
        url: this.model.get('url'),
        ...protomapsL.json_style(this.model.get('style')),
      };
      this.obj = protomapsL.leafletLayer(options);
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

      handle_message(content) {
        if (content.msg == 'add_inspector') {
          this.obj.addInspector(this.map_view.obj);
        }
      }
    }
    