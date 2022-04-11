// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const rasterlayer = require('./ImageOverlay.js');

export class LeafletSVGOverlayModel extends rasterlayer.LeafletImageOverlayModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletSVGOverlayView',
      _model_name: 'LeafletSVGOverlayModel',
      value: '',
      view_box: '0 0 200 200',
      attribution: ''
    };
  }
}

export class LeafletSVGOverlayView extends rasterlayer.LeafletImageOverlayView {
  create_obj() {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svgElement.setAttribute('viewBox', this.model.get('view_box'));
    svgElement.innerHTML = this.model.get('value');

    this.obj = L.svgOverlay(
      svgElement,
      this.model.get('bounds'),
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
