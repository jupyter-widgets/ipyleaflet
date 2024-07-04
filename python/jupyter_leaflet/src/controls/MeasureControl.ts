// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// leaflet-measure does not have typescript definitions
import L from '../leaflet';
import * as control from './Control';

// Workaround for map panning bug
// from https://github.com/ljagis/leaflet-measure/issues/171#issuecomment-1137483548
L.Control.Measure.include({
  // set icon on the capture marker
  _setCaptureMarkerIcon: function () {
    // disable autopan
    this._captureMarker.options.autoPanOnFocus = false;

    // default function
    this._captureMarker.setIcon(
      L.divIcon({
        iconSize: this._map.getSize().multiplyBy(2),
      })
    );
  },
});
export class LeafletMeasureControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMeasureControlView',
      _model_name: 'LeafletMeasureControlModel',
      primary_length_unit: 'feet',
      secondary_length_unit: undefined,
      primary_area_unit: 'acres',
      secondar_area_unit: undefined,
      active_color: '#ABE67E',
      completed_color: '#C8F2BE',
      popup_options: {
        className: 'leaflet-measure-resultpopup',
        autoPanPadding: [10, 10],
      },
      capture_z_index: 10000,
      _custom_units: {},
    };
  }
}

export class LeafletMeasureControlView extends control.LeafletControlView {
  obj: any;
  default_units: any;

  initialize(parameters: any) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.obj = L.control.measure(this.get_options());
    this.default_units = L.extend({}, this.obj.options.units);
  }

  get_measure_control_options() {
    const options = this.get_options();
    options['units'] = L.extend(
      {},
      this.default_units,
      this.model.get('_custom_units')
    );
    return options;
  }

  model_events() {
    let key;
    const o = this.model.get('options');
    for (let i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(this.model, 'change:' + key, () => {
        // Workaround for https://github.com/ljagis/leaflet-measure/issues/112
        // and https://github.com/ljagis/leaflet-measure/issues/113
        // Once fixed, the next line should be replaced by: L.setOptions(this.obj, this.get_options());
        this.obj.initialize(this.get_measure_control_options());
      });
    }
  }
}
