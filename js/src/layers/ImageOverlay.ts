// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

//@ts-nocheck
import * as L from '../leaflet';
import * as rasterlayer from './RasterLayer';

const DEFAULT_LOCATION = [0.0, 0.0];

export class LeafletImageOverlayModel extends rasterlayer.LeafletRasterLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletImageOverlayView',
      _model_name: 'LeafletImageOverlayModel',
      url: '',
      bounds: [DEFAULT_LOCATION, DEFAULT_LOCATION],
      attribution: '',
    };
  }
}

export class LeafletImageOverlayView extends rasterlayer.LeafletRasterLayerView {
  create_obj() {
    //@ts-ignore
    this.obj = L.imageOverlay(
      this.model.get('url'),
      this.model.get('bounds'),
      this.get_options()
    );
  }

  model_events() {
    super.model_events();

    this.listenTo(
      this.model,
      'change:url',
      function () {
        const url = this.model.get('url');
        this.obj.setUrl(url);
      },
      this
    );

    this.listenTo(
      this.model,
      'change:bounds',
      function () {
        const bounds = this.model.get('bounds');
        this.obj.setBounds(bounds);
      },
      this
    );
  }
}
