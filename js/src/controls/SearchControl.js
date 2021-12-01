// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletSearchControlModel extends control.LeafletControlModel {
  defaults(){
    return{
      ...super.defaults(),
      _view_name: 'LeafletSearchControlView',
      _model_name: 'LeafletSearchControlModel',
      url: null,
      jsonp_param: 'json_callback',
      property_name: 'display_name',
      property_loc: ['lat','lon'],
      auto_type: false,
      auto_collapse: false,
      zoom:null,
      animate_location:false,
      found_style: {fillColor: "#3f0", color: "#0f0"},
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
    const layer = this.model.get('layer');
    const marker = this.model.get('marker');
    const layer_promise = layer !== null ? this.create_child_view(layer) : Promise.resolve(null);
    const marker_promise = marker !== null ? this.create_child_view(marker) : Promise.resolve(null);

    return Promise.all([layer_promise, marker_promise]).then(result => {
      const layer_view = result[0];
      const marker_view = result[1];
      const options = this.get_options();
      options.layer = layer_view !== null ? layer_view.obj : null;
      options.marker = marker_view !== null ? marker_view.obj : false;
      this.obj = L.control.search(options);
    });
  }

  leaflet_events() {
    this.obj.on('search:locationfound', (e) => {
      if (e.layer !== null) {
        var found_style = this.model.get('found_style');
        e.layer.setStyle(found_style);
        if (e.layer._popup) {
          e.layer.openPopup();
        }
      }

      this.send({
        event: 'locationfound',
        text: e.text,
        feature: e.layer !== null ? e.layer.feature : null,
        location: [e.latlng.lat, e.latlng.lng]
      });
    });
  }
}
