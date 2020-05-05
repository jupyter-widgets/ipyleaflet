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
      jsonpParam: 'json_callback',
      propertyName: 'display_name',
      propertyLoc: ['lat','lon'],
      autoType: false,
      autoCollapse: false,
      zoom:10,
      animateLocation:false,
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

  get_options() {
    const options = super.get_options();
    options['url'] = this.model.get('url');
    options['zoom'] = this.model.get('zoom');
    options['jsonpParam'] = this.model.get('jsonpParam');
    options['propertyLoc'] = this.model.get('propertyLoc');
    options['autoType'] = this.model.get('autoType');
    options['autoCollapse'] = this.model.get('autoCollapse');
    options['animateLocation'] = this.model.get('animateLocation')
    options['marker'] = this.model.get('marker');
    options['propertyName'] = this.model.get('propertyName')
    return options;
  }
}