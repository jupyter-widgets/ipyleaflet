// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const featuregroup = require('./FeatureGroup.js');
const omnivore = require('@mapbox/leaflet-omnivore');


export class LeafletWKTModel extends featuregroup.LeafletFeatureGroupModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletWKTView',
      _model_name: 'LeafletWKTModel',

      url: '',
      wkt_string: '',
      style: {},
    };
  }
}

export class LeafletWKTView extends featuregroup.LeafletFeatureGroupView {
  create_obj() {
    const url = this.model.get('url');
    const wktString =  this.model.get('wkt_string');
    if (url) {
      this.obj = omnivore.wkt(url);
      var self = this;
      this.obj.on('ready', function(e){
        self.obj.setStyle(self.model.get('style'));
      });
    } else if (wktString){
      this.obj = omnivore.wkt.parse(wktString);
      this.obj.setStyle(this.model.get('style'));
    }
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:style',
      function() {
        this.obj.setStyle(this.model.get('style'));
      },
      this
    );
  }
}
