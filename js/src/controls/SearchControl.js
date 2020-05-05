// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

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
      marker: L.circleMarker([0,0],{radius:30}),
    };
  }
}


export class LeafletSearchControlView extends control.LeafletControlView{
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.obj = L.control.search(this.get_options());
  }
}