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
    };
  }
}

LeafletSearchControlModel.serializers = {
  ...control.LeafletControlModel.serializers,
  marker: { deserialize: widgets.unpack_models }
};


export class LeafletSearchControlView extends control.LeafletControlView {
  create_obj() {
    return this.create_child_view(this.model.get('marker')).then((view) => {
      let options = this.get_options();
      options.marker = view.obj;
      this.obj = L.control.search(options);
    });
  }
}
