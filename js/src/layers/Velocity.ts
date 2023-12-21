// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

//@ts-nocheck
import L from '../leaflet';
import * as utils from '../utils';
import * as layer from './Layer';

export class LeafletVelocityModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVelocityView',
      _model_name: 'LeafletVelocityModel',
      displayValues: true,
      displayOptions: {
        velocityType: 'Global Wind',
        position: 'bottomleft',
        emptyString: 'No velocity data',
        angleConvention: 'bearingCW',
        displayPosition: 'bottomleft',
        displayEmptyString: 'No velocity data',
        speedUnit: 'kt',
      },
      data: [],
      minVelocity: 0,
      maxVelocity: 10,
      velocityScale: 0.005,
      colorScale: [],
    };
  }
}

export class LeafletVelocityView extends layer.LeafletLayerView {
  create_obj() {
    var options = this.get_options();
    options.data = this.model.get('data');
    //@ts-ignore
    this.obj = L.velocityLayer(options);
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:data',
      function () {
        const data = this.model.get('data');
        this.obj.setData(data);
      },
      this
    );
    // Separate display_options from the options to perform a shallow copy.
    var key = 'display_options';
    this.listenTo(
      this.model,
      'change:' + key,
      function () {
        var options = {};
        //@ts-ignore
        options[utils.camel_case(key)] = { ...this.model.get(key) };
        //@ts-ignore
        L.setOptions(this.obj, options);
      },
      this
    );
  }
}
