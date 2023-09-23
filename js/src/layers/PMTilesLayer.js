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
            attribution: '',
            style: {},
        };
    }
}

export class LeafletPMTilesLayerView extends layer.LeafletLayerView {
    create_obj() {
        this.obj = L.protomapsL.leafletLayer(this.model.get('url'), this.get_options());
        // this.model.on('msg:custom', this.handle_message.bind(this));
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
    