// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const rasterlayer = require('./ImageOverlay.js');

const DEFAULT_LOCATION = [0.0, 0.0];

export class LeafletSVGOverlayModel extends rasterlayer.ImageOverlayModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletSVGOverlayView',
      _model_name: 'LeafletSVGOverlayModel',
      svgElement: '',
      svgBounds: [DEFAULT_LOCATION, DEFAULT_LOCATION],
      attribution: ''
    };
  }
}

export class LeafletSVGOverlayView extends rasterlayer.ImageOverlayView {
  create_obj() {
    this.obj = L.svgOverlay(
      this.model.get('svgElement'),
      this.model.get('svgBounds'),
      this.get_options()
    );
  }

  //model_events() {
    //super.model_events();

    //this.listenTo(
      //this.model,
      //'change:svgElement',
      //function() {
        //const svgElement = this.model.get('svgElement');
        //this.obj.getElement();
      //},
      //this
    //);
  //}
}
