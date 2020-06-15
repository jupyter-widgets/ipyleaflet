// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletSearchControlModel extends control.LeafletControlModel {
  defaults(){
    return{
      _view_name: 'LeafletSearchControlView',
      _model_name: 'LeafletSearchControlModel',
      url: null,
      jsonp_param: 'json_callback',
      property_name: 'display_name',
      property_loc: ['lat','lon'],
      auto_type: false,
      auto_collapse: false,
      zoom:10,
      animate_location:false,
      marker: null,
      layer: null,
    };
  }
}

LeafletSearchControlModel.serializers = {
  ...control.LeafletControlModel.serializers,
  marker: { deserialize: widgets.unpack_models },
  layer: { deserialize: widgets.unpack_models },
};


export class LeafletSearchControlView extends control.LeafletControlView {
  create_obj() {
    if (this.model.get('layer') !== null) {
        return this.create_child_view(this.model.get('layer')).then((layer_view) => {
            let options = this.get_options();
            options.layer = layer_view.obj;
            options.marker = false;
            this.obj = L.control.search(options);
        });
    } else {
        return this.create_child_view(this.model.get('marker')).then((view) => {
            let options = this.get_options();
            options.marker = view.obj;
            this.obj = L.control.search(options);
        });
    }
  }

  leaflet_events() {
    if (this.model.get('layer') !== null) {
        this.obj.on('search:locationfound', function(e) {
            e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
            if(e.layer._popup)
                e.layer.openPopup();
        });
    }
  }
}
